const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// 📌 Registrierung (Sign-Up)
exports.register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Prüfe, ob Benutzer existiert
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: "Benutzer existiert bereits!" });

        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Benutzer speichern
        const newUser = await prisma.user.create({
            data: { firstName, lastName, email, password: hashedPassword }
        });

        res.status(201).json({ message: "Benutzer erfolgreich registriert!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Fehler bei der Registrierung!", error });
    }
};

// 📌 Login (Sign-In)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Benutzer finden
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "Ungültige Anmeldeinformationen!" });

        // Passwort überprüfen
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Falsches Passwort!" });

        // JWT Token generieren
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login erfolgreich!", token, user });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Login!", error });
    }
};
