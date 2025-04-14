import express from "express";
const router = express.Router();

router.post("/register", (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "Benutzer erfolgreich registriert!" });
});

export default router;
