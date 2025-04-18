import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Registrierung
router.post("/register", async (req, res) => {
    console.log("Request body:", req.body); 

  try {
    console.log("📩 Eingehende Daten:", req.body);
    const { vorname, nachname, email, passwort, faecher, rolle } = req.body;

    // Fächer zur Sicherheit immer als Array behandeln
const sichereFaecher = Array.isArray(faecher)
  ? faecher
  : String(faecher).split(",").map((f) => f.trim());

console.log("💥 Sicherheitscheck faecher:", sichereFaecher);

    const newUser = new User({
      vorname,
      nachname,
      email,
      passwort,
      rolle,
      faecher: sichereFaecher,
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

export default router;
