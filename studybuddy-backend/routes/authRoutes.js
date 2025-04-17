import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Registrierung
router.post("/register", async (req, res) => {
  try {
    const { vorname, nachname, email, passwort, faecher } = req.body;

    const newUser = new User({
      vorname,
      nachname,
      email,
      passwort,
      faecher,
    });

    await newUser.save();
    res.status(201).json({ message: "Benutzer erfolgreich registriert!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Fehler bei der Registrierung" });
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

export default router;
