import User from "../models/User.js";

export const registerUser = async (req, res) => {
    const { vorname, nachname, email, passwort, rolle } = req.body;
    try {
        const neuerUser = new User({ vorname, nachname, email, passwort, rolle });
        await neuerUser.save();
        res.status(201).json({ message: "Erfolgreich registriert" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, passwort } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.passwort !== passwort) {
            return res.status(401).json({ message: "Ungültige Zugangsdaten" });
        }
        res.json({ message: "Login erfolgreich", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
