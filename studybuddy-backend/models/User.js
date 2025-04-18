import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  vorname: {
    type: String,
    required: [true, "Vorname ist erforderlich"],
  },
  nachname: {
    type: String,
    required: [true, "Nachname ist erforderlich"],
  },
  email: {
    type: String,
    required: [true, "E-Mail ist erforderlich"],
    unique: true,
  },
  passwort: {
    type: String,
    required: [true, "Passwort ist erforderlich"],
  },
  faecher: {
    type: [String],
    required: [true, "Mindestens ein Fach muss ausgewählt werden"],
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length > 0;
      },
      message: "Mindestens ein Fach muss ausgewählt werden",
    },
  },
  rolle: { type: String, enum: ["ng", "nn"], required: true },
  bemerkung: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
