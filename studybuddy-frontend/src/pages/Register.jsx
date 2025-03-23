import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", { firstName, lastName, email, password });
      alert("Registrierung erfolgreich!");
      navigate("/");
    } catch (error) {
      alert("Registrierung fehlgeschlagen!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Registrieren</h2>
        <input type="text" placeholder="Vorname" className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Nachname" className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setLastName(e.target.value)} required />
        <input type="email" placeholder="E-Mail" className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Passwort" className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-blue-500 text-white py-2 rounded">Registrieren</button>
      </form>
    </div>
  );
}

export default Register;
