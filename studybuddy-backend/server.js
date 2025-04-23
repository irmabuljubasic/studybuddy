import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();



// Cookie Parser MUSS VOR Routing kommen
app.use(cookieParser());

// CORS richtig konfigurieren für Cookies
app.use(
  cors({
    origin: "http://localhost:5173", // deine Frontend-Vite-Adresse
    credentials: true,               // erlaubt Cookies (wichtig!)
  })
);

// Body Parser für JSON
app.use(express.json());

// API-Routen
app.use("/api/auth", authRoutes);

// Datenbankverbindung
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✔️ MongoDB verbunden"))
  .catch((err) => console.error("✖️ Fehler bei MongoDB:", err));

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server läuft auf Port ${PORT}`);
});
