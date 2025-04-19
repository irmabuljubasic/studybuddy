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
  erstelltAm: {
    type: Date,
    default: Date.now,
  },
});

const Anfrage = mongoose.model("Anfrage", anfrageSchema);
export default Anfrage;
