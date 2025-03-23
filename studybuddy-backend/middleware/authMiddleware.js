const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || "supersecretkey";

// Middleware zum Überprüfen des Tokens
exports.authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Zugriff verweigert! Kein Token vorhanden." });
    }

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next(); // Fährt mit der Anfrage fort
    } catch (error) {
        res.status(400).json({ message: "Ungültiges Token!" });
    }
};
