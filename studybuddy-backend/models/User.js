import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  vorname: String,
  nachname: String,
  email: { type: String, unique: true },
  passwort: String,
  rolle: String, // "ng" oder "nn"
  faecher: [String],
  bemerkung: String,
});

export default mongoose.model("User", userSchema);
