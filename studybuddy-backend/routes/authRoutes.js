import express from "express";
import User from "../models/User.js";
import Anfrage from "../models/Anfrage.js";

const router = express.Router();

// Registrierung
router.post("/register", async (req, res) => {
    console.log("Request body:", req.body); 

  try {
    const { vorname, nachname, email, passwort, faecher, rolle } = req.body;

    const newUser = new User({
      vorname,
      nachname,
      email,
      passwort,
      rolle,
      faecher,
    });

    await newUser.save();
    res.status(201).json({ message: "Benutzer erfolgreich registriert!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler bei der Registrierung" });
  }
});

 // Anmeldung
router.post("/login", async (req, res) => {
  const { email, passwort } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Benutzer nicht gefunden" });

    if (user.passwort !== passwort) return res.status(401).json({ message: "Falsches Passwort" });

    res.status(200).json({ message: "Login erfolgreich", user });
  } catch (err) {
    res.status(500).json({ error: "Login fehlgeschlagen", details: err.message });
  }
});


// Profil aktualisieren
router.put("/update/:email", async (req, res) => {
  const { email } = req.params;
  const { vorname, nachname, faecher, bemerkung } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    user.vorname = vorname ?? user.vorname;
    user.nachname = nachname ?? user.nachname;
    user.faecher = faecher ?? user.faecher;
    user.bemerkung = bemerkung ?? user.bemerkung;

    await user.save();

    res.status(200).json({ message: "Profil erfolgreich aktualisiert", user });
  } catch (err) {
    console.error("Fehler beim Update:", err);
    res.status(500).json({ message: "Fehler beim Updaten", error: err.message });
  }
});


// Benutzer löschen
router.delete("/delete/:email", async (req, res) => {
    const { email } = req.params;

    try {
        const result = await User.deleteOne({ email });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Benutzer nicht gefunden" });
        }
        res.status(200).json({ message: "Benutzer erfolgreich gelöscht" });
    } catch (err) {
        console.error("Fehler beim Löschen:", err);
        res.status(500).json({ message: "Fehler beim Löschen", error: err.message });
    }
});

// NGs nach Fach filtern
router.post("/ngs", async (req, res) => {
  const { faecher } = req.body; // wichtig: KEIN Umlaut "ä"

  try {
    const nachhilfeGeber = await User.find({
      rolle: "ng",
      faecher: { $in: faecher },
    }).select("-passwort -email"); // schütze sensible Daten

    res.status(200).json(nachhilfeGeber);
  } catch (err) {
    console.error("Fehler bei der NG-Suche:", err);
    res.status(500).json({ message: "Serverfehler bei NG-Suche" });
  }
});

// Einzelnes NG-Profil abrufen
router.get("/ng/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).select("-passwort -email");
        if (!user || user.rolle !== "ng") {
            return res.status(404).json({ message: "Nachhilfegeber nicht gefunden" });
        }

        res.status(200).json(user);
    } catch (err) {
        console.error("Fehler beim Laden des NG-Profils:", err);
        res.status(500).json({ message: "Fehler beim Laden des Profils" });
    }
});

// NN schickt Anfrage an NG (nur eine pro NG erlaubt)
router.post("/anfrage", async (req, res) => {
  const { vonId, anId } = req.body;

  try {
    // Prüfen, ob Anfrage bereits existiert
    const existiert = await Anfrage.findOne({ von: vonId, an: anId });
    if (existiert) {
      return res.status(400).json({ message: "Du hast dieser Person bereits eine Anfrage geschickt." });
    }

    // Neue Anfrage erstellen
    const neueAnfrage = new Anfrage({ von: vonId, an: anId });
    await neueAnfrage.save();

    res.status(201).json({ message: "Anfrage gesendet!" });
  } catch (err) {
    console.error("Fehler beim Senden der Anfrage:", err);
    res.status(500).json({ message: "Fehler beim Senden" });
  }
});

//NG erhaltet Anfrage von NN
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


export default router;
