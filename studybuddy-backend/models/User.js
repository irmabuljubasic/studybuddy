import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  vorname: { type: String, required: true },
  nachname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwort: { type: String, required: true },
  faecher: [{ type: String }],
});

const User = mongoose.model("User", userSchema);
export default User;
