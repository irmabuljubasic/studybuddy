import logo from "../../assets/studybuddy-logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [passwort, setPasswort] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include", // WICHTIG damit Cookie gesetzt wird
                body: JSON.stringify({ email, passwort }),
              });

            const data = await res.json();

            if (res.ok) {
                // Speichern in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("rolle", data.user.rolle);

                // Weiterleitung je nach Rolle
                if (data.user.rolle === "ng") {
                    navigate("/ng/profil");
                } else if (data.user.rolle === "nn") {
                    navigate("/nn/profil");
                } else {
                    navigate("/");
                }
            } else {
                alert(data.message || "Login fehlgeschlagen");
            }
        } catch (err) {
            console.error("Login Fehler:", err);
            alert("Serverfehler beim Login");
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <img src={logo} alt="StudyBuddy Logo" className="w-40 h-auto mb-6" />

            <div className="w-80 bg-white rounded-xl p-6 flex flex-col items-center gap-6 shadow-md">
                <h2 className="text-pink font-bold text-xl">Login</h2>

                <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-48 h-12 px-4 rounded bg-zinc-300 text-stone-700 placeholder-stone-600/50 text-sm focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    className="w-48 h-12 px-4 rounded bg-zinc-300 text-stone-700 placeholder-stone-600/50 text-sm focus:outline-none"
                />

                <button
                    onClick={handleLogin}
                    className="bg-pink text-white font-semibold px-6 py-2 rounded shadow-md hover:scale-105 transition"
                >
                    Anmelden
                </button>
            </div>
        </div>
    );
};

export default Login;
