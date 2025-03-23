const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "E-Mail nicht gefunden!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Falsches Passwort!" });
    }

    const token = jwt.sign({ id: user.id }, "geheimesJWTToken", { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
});

module.exports = router;
