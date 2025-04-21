import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Anfrage from "../models/Anfrage.js";

const router = express.Router();

// Registrierung
router.post("/register", async (req, res) => {
  try {
    const { vorname, nachname, email, passwort, faecher, rolle } = req.body;

    // Schul-E-Mail überprüfen
    const emailPattern = /^[a-z]+\.[a-z]+\.student@htl-hallein\.at$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({
        message: "Nur Schul-E-Mails erlaubt (vorname.nachname.student@htl-hallein.at)",
      });
    }

    // Passwort-Sicherheit prüfen
    const pwPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!pwPattern.test(passwort)) {
      return res.status(400).json({
        message:
          "Passwort muss mind. 8 Zeichen lang sein & Groß-, Kleinbuchstaben, Zahlen & Sonderzeichen enthalten",
      });
    }

    // Passwort verschlüsseln
    const hashedPassword = await bcrypt.hash(passwort, 10);

    const newUser = new User({
      vorname,
      nachname,
      email,
      passwort: hashedPassword,
      rolle,
      faecher,
    });

    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich registriert!" });
  } catch (err) {
    console.error("Fehler bei der Registrierung:", err);
    res.status(500).json({ error: "Fehler bei der Registrierung" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, passwort } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Benutzer nicht gefunden" });

    const isMatch = await bcrypt.compare(passwort, user.passwort);
    if (!isMatch)
      return res.status(401).json({ message: "Falsches Passwort" });

    res.status(200).json({ message: "Login erfolgreich", user });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Login fehlgeschlagen", details: err.message });
  }
});

// Profil aktualisieren
router.put("/update/:email", async (req, res) => {
  const { email } = req.params;
  const { vorname, nachname, faecher, bemerkung } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Benutzer nicht gefunden" });

    user.vorname = vorname ?? user.vorname;
    user.nachname = nachname ?? user.nachname;
    user.faecher = faecher ?? user.faecher;
    user.bemerkung = bemerkung ?? user.bemerkung;

    await user.save();

    res.status(200).json({ message: "Profil erfolgreich aktualisiert", user });
  } catch (err) {
    console.error("Fehler beim Update:", err);
    res
      .status(500)
      .json({ message: "Fehler beim Updaten", error: err.message });
  }
});

// Benutzer löschen
router.delete("/delete/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const result = await User.deleteOne({ email });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Benutzer nicht gefunden" });

    res.status(200).json({ message: "Benutzer erfolgreich gelöscht" });
  } catch (err) {
    console.error("Fehler beim Löschen:", err);
    res
      .status(500)
      .json({ message: "Fehler beim Löschen", error: err.message });
  }
});

// NGs nach Fach filtern
router.post("/ngs", async (req, res) => {
  const { faecher } = req.body;

  try {
    const nachhilfeGeber = await User.find({
      rolle: "ng",
      faecher: { $in: faecher },
    }).select("-passwort -email");

    res.status(200).json(nachhilfeGeber);
  } catch (err) {
    console.error("Fehler bei der NG-Suche:", err);
    res.status(500).json({ message: "Serverfehler bei NG-Suche" });
  }
});

// Einzelnes NG-Profil abrufen
router.get("/ng/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwort -email");
    if (!user || user.rolle !== "ng") {
      return res
        .status(404)
        .json({ message: "Nachhilfegeber nicht gefunden" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Fehler beim Laden des NG-Profils:", err);
    res.status(500).json({ message: "Fehler beim Laden des Profils" });
  }
});

// NN schickt Anfrage an NG
router.post("/anfrage", async (req, res) => {
  const { vonId, anId } = req.body;

  if (!vonId || !anId) {
    return res
      .status(400)
      .json({ message: "Fehlende Nutzer-ID (vonId oder anId)!" });
  }

  try {
    const existiert = await Anfrage.findOne({ von: vonId, an: anId });
    if (existiert) {
      return res
        .status(400)
        .json({ message: "Du hast dieser Person bereits eine Anfrage geschickt." });
    }

    const neueAnfrage = new Anfrage({ von: vonId, an: anId, status: "ausstehend" });
    await neueAnfrage.save();

    res.status(201).json({ message: "Anfrage gesendet!" });
  } catch (err) {
    console.error("Fehler beim Senden der Anfrage:", err);
    res.status(500).json({ message: "Fehler beim Senden" });
  }
});

// NG erhaltet Anfragen
router.get("/anfragen/:ngId", async (req, res) => {
  try {
    const anfragen = await Anfrage.find({ an: req.params.ngId })
      .populate("von", "vorname nachname bemerkung faecher")
      .sort({ erstelltAm: -1 });

    res.status(200).json(anfragen);
  } catch (err) {
    console.error("Fehler beim Abrufen der Anfragen:", err);
    res.status(500).json({ message: "Fehler beim Laden der Anfragen" });
  }
});

// NG beantwortet Anfrage
router.put("/anfrage/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const anfrage = await Anfrage.findById(req.params.id).populate("von", "email");
    if (!anfrage)
      return res.status(404).json({ message: "Anfrage nicht gefunden" });

    anfrage.status = status;
    await anfrage.save();

    const email = status === "angenommen" ? anfrage.an.email : null;

    res.status(200).json({
      message: `Anfrage wurde ${status}`,
      ...(email && { email }),
    });
  } catch (err) {
    console.error("Fehler beim Beantworten:", err);
    res.status(500).json({ message: "Fehler beim Aktualisieren" });
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
    console.error("Fehler beim Abrufen der Anfragen vom NN:", err);
    res.status(500).json({ message: "Fehler beim Laden der Anfragen" });
  }
});

// Anfrage löschen
router.delete("/anfrage/:id", async (req, res) => {
  try {
    const result = await Anfrage.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Anfrage nicht gefunden" });
    }
    res.status(200).json({ message: "Anfrage gelöscht" });
  } catch (err) {
    console.error("Fehler beim Löschen der Anfrage:", err);
    res.status(500).json({ message: "Fehler beim Löschen" });
  }
});

export default router;
