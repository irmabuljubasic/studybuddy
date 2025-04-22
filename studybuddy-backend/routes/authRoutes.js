import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "../models/User.js";
import Anfrage from "../models/Anfrage.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "geheimesToken";

router.use(cookieParser());

// Middleware zum Verifizieren
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Nicht autorisiert" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Ungültiger Token" });
  }
};

// Registrierung
router.post("/register", async (req, res) => {
  try {
    const { vorname, nachname, email, passwort, faecher, rolle } = req.body;

    const emailPattern = /^[a-z]+\.[a-z]+\.student@htl-hallein\.at$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Nur Schul-E-Mails erlaubt (vorname.nachname.student@htl-hallein.at)",
      });
    }

    const pwPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!pwPattern.test(passwort)) {
      return res.status(400).json({
        message: "Passwort muss mindestens 8 Zeichen lang sein, Groß-/Kleinbuchstaben, Zahl & Sonderzeichen enthalten.",
      });
    }

    const hashedPassword = await bcrypt.hash(passwort, 10);
    const newUser = new User({ vorname, nachname, email, passwort: hashedPassword, rolle, faecher });
    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich registriert!" });
  } catch (err) {
    console.error("Registrierungsfehler:", err);
    res.status(500).json({ error: "Fehler bei der Registrierung" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, passwort } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

    const isMatch = await bcrypt.compare(passwort, user.passwort);
    if (!isMatch) return res.status(401).json({ message: "Falsches Passwort" });

    const token = jwt.sign({ id: user._id, rolle: user.rolle }, JWT_SECRET, { expiresIn: "3d" });

    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false, // setze auf true in Produktion
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login erfolgreich", user });
  } catch (err) {
    console.error("Loginfehler:", err);
    res.status(500).json({ message: "Login fehlgeschlagen" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Erfolgreich ausgeloggt" });
});

// Profil aktualisieren (nur eigene)
router.put("/update/:email", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

    const { vorname, nachname, faecher, bemerkung } = req.body;

    user.vorname = vorname ?? user.vorname;
    user.nachname = nachname ?? user.nachname;
    user.faecher = faecher ?? user.faecher;
    user.bemerkung = bemerkung ?? user.bemerkung;

    await user.save();
    res.status(200).json({ message: "Profil aktualisiert", user });
  } catch (err) {
    res.status(500).json({ message: "Update fehlgeschlagen", error: err.message });
  }
});

// Benutzer löschen
router.delete("/delete/:email", verifyToken, async (req, res) => {
  try {
    const result = await User.deleteOne({ email: req.params.email });
    if (result.deletedCount === 0) return res.status(404).json({ message: "Benutzer nicht gefunden" });

    res.status(200).json({ message: "Benutzer gelöscht" });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Löschen", error: err.message });
  }
});

// NGs nach Fach suchen
router.post("/ngs", async (req, res) => {
  try {
    const nachhilfeGeber = await User.find({
      rolle: "ng",
      faecher: { $in: req.body.faecher },
    }).select("-passwort -email");

    res.status(200).json(nachhilfeGeber);
  } catch (err) {
    res.status(500).json({ message: "Fehler bei der Suche" });
  }
});

// Einzelnes NG-Profil anzeigen
router.get("/ng/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwort -email");
    if (!user || user.rolle !== "ng") return res.status(404).json({ message: "NG nicht gefunden" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Laden des Profils" });
  }
});

// NN schickt Anfrage an NG
router.post("/anfrage", async (req, res) => {
  const { vonId, anId } = req.body;
  if (!vonId || !anId) return res.status(400).json({ message: "vonId oder anId fehlt!" });

  try {
    const existiert = await Anfrage.findOne({ von: vonId, an: anId });
    if (existiert) return res.status(400).json({ message: "Anfrage wurde bereits gesendet" });

    const neueAnfrage = new Anfrage({ von: vonId, an: anId, status: "ausstehend" });
    await neueAnfrage.save();

    res.status(201).json({ message: "Anfrage gesendet!" });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Senden der Anfrage" });
  }
});

// NG sieht Anfragen
router.get("/anfragen/:ngId", async (req, res) => {
  try {
    const anfragen = await Anfrage.find({ an: req.params.ngId })
      .populate("von", "vorname nachname bemerkung faecher")
      .sort({ erstelltAm: -1 });

    res.status(200).json(anfragen);
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Laden der Anfragen" });
  }
});

// NG beantwortet Anfrage
router.put("/anfrage/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const anfrage = await Anfrage.findById(req.params.id).populate("von", "email");
    if (!anfrage) return res.status(404).json({ message: "Anfrage nicht gefunden" });

    anfrage.status = status;
    await anfrage.save();

    res.status(200).json({
      message: `Anfrage wurde ${status}`,
      ...(anfrage.an?.email && { email: anfrage.an.email }),
    });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Beantworten" });
  }
});

// NN sieht gesendete Anfragen
router.get("/anfragen-von/:nnId", async (req, res) => {
  try {
    const anfragen = await Anfrage.find({ von: req.params.nnId })
      .populate("an", "vorname nachname email")
      .sort({ erstelltAm: -1 });

    res.status(200).json(anfragen);
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Laden der Anfragen" });
  }
});

// Anfrage löschen
router.delete("/anfrage/:id", async (req, res) => {
  try {
    const result = await Anfrage.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Anfrage nicht gefunden" });

    res.status(200).json({ message: "Anfrage gelöscht" });
  } catch (err) {
    res.status(500).json({ message: "Fehler beim Löschen" });
  }
});

export default router;
