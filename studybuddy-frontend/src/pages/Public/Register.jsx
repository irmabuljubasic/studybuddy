import logo from "../../assets/studybuddy-logo.png";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const subjects = [
    "Mathe", "Deutsch", "Englisch", "NW(Chemie, Physik)", "Ggp", "Infi", "Swp",
    "Ufw1", "Ufw2", "Bet", "Bdda", "Kobe", "Maa1", "Mela", "Mt", "Nwes", "Amec",
    "Wsft", "Rsor", "Sein"
].map((fach) => ({ value: fach, label: fach }));

const Register = () => {
    const navigate = useNavigate();

    const [vorname, setVorname] = useState("");
    const [nachname, setNachname] = useState("");
    const [email, setEmail] = useState("");
    const [passwort, setPasswort] = useState("");
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const handleRegister = () => {
        const rolle = localStorage.getItem("rolle");

        // Hier später: API-Call für Registrierung

        if (rolle === "ng") {
            navigate("/ng/profil");
        } else if (rolle === "nn") {
            navigate("/nn/profil");
        } else {
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
            <img src={logo} alt="StudyBuddy Logo" className="w-40 h-auto mb-6" />

            <div className="w-80 bg-white rounded-xl p-6 flex flex-col items-center gap-4 shadow-md">
                <h2 className="text-pink font-bold text-xl">Registrieren</h2>

                <input
                    type="text"
                    placeholder="Vorname"
                    value={vorname}
                    onChange={(e) => setVorname(e.target.value)}
                    className="w-full h-12 px-3 rounded bg-zinc-300 placeholder-stone-500"
                />
                <input
                    type="text"
                    placeholder="Nachname"
                    value={nachname}
                    onChange={(e) => setNachname(e.target.value)}
                    className="w-full h-12 px-3 rounded bg-zinc-300 placeholder-stone-500"
                />
                <input
                    type="email"
                    placeholder="E-Mail-Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 px-3 rounded bg-zinc-300 placeholder-stone-500"
                />
                <input
                    type="password"
                    placeholder="Passwort"
                    value={passwort}
                    onChange={(e) => setPasswort(e.target.value)}
                    className="w-full h-12 px-3 rounded bg-zinc-300 placeholder-stone-500"
                />

                {/* Fach Dropdown */}
                <div className="w-full text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fach (mehrere möglich)
                    </label>
                    <Select
                        options={subjects}
                        isMulti
                        onChange={setSelectedSubjects}
                        className="text-sm"
                        classNamePrefix="select"
                    />
                </div>

                <button
                    onClick={handleRegister}
                    className="w-40 h-11 bg-pink text-white font-semibold rounded shadow-md hover:scale-105 transition mt-2"
                >
                    Registrieren
                </button>
            </div>
        </div>
    );
};

export default Register;
