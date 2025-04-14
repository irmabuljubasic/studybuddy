import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const neuerUser = new User(req.body);
    await neuerUser.save();
    res.status(201).json(neuerUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;