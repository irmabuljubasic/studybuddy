import React, { useState } from "react";
import Select from "react-select";
import logo from "../../assets/studybuddy-logo.png";
import { useNavigate } from "react-router-dom";

const fächerOptions = [
    { value: "Mathe", label: "Mathe" },
    { value: "Deutsch", label: "Deutsch" },
    { value: "Englisch", label: "Englisch" },
    { value: "NW", label: "NW (Chemie, Physik)" },
    { value: "Ggp", label: "Ggp" },
    { value: "Infi", label: "Infi" },
    { value: "Swp", label: "Swp" },
    { value: "Ufw1", label: "Ufw1" },
    { value: "Ufw2", label: "Ufw2" },
    { value: "Bet", label: "Bet" },
    { value: "Bdda", label: "Bdda" },
    { value: "Kobe", label: "Kobe" },
    { value: "Maa1", label: "Maa1" },
    { value: "Mela", label: "Mela" },
    { value: "Mt", label: "Mt" },
    { value: "Nwes", label: "Nwes" },
    { value: "Amec", label: "Amec" },
    { value: "Wsft", label: "Wsft" },
    { value: "Rsor", label: "Rsor" },
    { value: "Sein", label: "Sein" },
];

const NNStartseite = () => {
    const navigate = useNavigate();
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    return (
        <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center gap-6">
            {/* Logo */}
            <img src={logo} alt="StudyBuddy Logo" className="w-32 mt-4" />

            {/* Dropdown Suche */}
            <div className="w-72 text-left">
            
                <Select
                    isMulti
                    name="fächer"
                    options={fächerOptions}
                    value={selectedSubjects}
                    onChange={setSelectedSubjects}
                    className="text-black"
                    placeholder="Suche..."
                />
            </div>

            {/* (Später: Gefilterte Nachhilfegeber hier anzeigen) */}

            {/* Bottom Nav */}
            <div className="w-full fixed bottom-0 left-0 flex">
                <button
                    onClick={() => navigate("/nn/profil")}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-stone-300 to-neutral-500 text-white text-lg font-medium"
                >
                    Profil
                </button>
                <button
                    className="w-1/3 h-14 bg-pink text-white text-lg font-medium"
                >
                    Startseite
                </button>
                <button
                    onClick={() => navigate("/nn/anfragen")}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-stone-300 to-neutral-500 text-white text-lg font-medium"
                >
                    Anfragen
                </button>
            </div>
        </div>
    );
};

export default NNStartseite;
