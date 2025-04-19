import mongoose from "mongoose";

const anfrageSchema = new mongoose.Schema({
  von: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  an: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["ausstehend", "angenommen", "abgelehnt"],
    default: "ausstehend", 
  },
  erstelltAm: {
    type: Date,
    default: Date.now,
  },
});

const Anfrage = mongoose.model("Anfrage", anfrageSchema);
export default Anfrage;
