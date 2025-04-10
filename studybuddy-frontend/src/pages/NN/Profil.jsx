import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/studybuddy-logo.png";

const NNProfil = () => {
    const navigate = useNavigate(); 
    return (
        <div className="min-h-screen bg-white px-4 py-6 flex flex-col items-center gap-6">
            {/* Logo */}
            <img src={logo} alt="StudyBuddy Logo" className="w-32 mt-4" />

            {/* Header mit Profilbild und Infos */}
            <div className="w-80 bg-gray-200 rounded p-3 flex items-center gap-4 shadow-md">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-xs">Foto</div>
                <div className="flex flex-col">
                    <span className="text-black font-bold leading-none">Vorname</span>
                    <span className="text-black font-bold leading-none">Nachname</span>
                    <span className="text-black text-sm leading-none">Email-Adresse</span>
                </div>
                <button className="ml-auto bg-pink text-white text-sm px-2 py-1 rounded">löschen</button>
            </div>

            {/* Fächer */}
            <div className="w-80">
                <label className="block font-semibold text-black mb-1">Fächer</label>
                <select
                    multiple
                    className="w-full h-24 bg-zinc-300 rounded px-2 py-1 text-black"
                >
                    <option>Mathe</option>
                    <option>Deutsch</option>
                    <option>Englisch</option>
                    <option>NW (Chemie, Physik)</option>
                    <option>GGP</option>
                    <option>SWP</option>
                    <option>Infi</option>
                </select>
                <div className="text-right text-sm mt-1">speichern</div>
            </div>

            {/* Bemerkung */}
            <div className="w-80">
                <label className="block font-semibold text-black mb-1">Bemerkung</label>
                <textarea
                    placeholder="Kommentar hier..."
                    className="w-full h-24 bg-zinc-300 rounded px-2 py-1 text-black"
                ></textarea>
                <div className="flex justify-between text-sm mt-1">
                    <span>bearbeiten</span>
                    <span>speichern</span>
                </div>
            </div>

            {/* Navigationsleiste */}
            <div className="w-full fixed bottom-0 flex justify-around">
                <button
                    onClick={() => navigate("/nn/profil")}
                    className="w-1/3 h-14 bg-pink text-white text-lg font-medium"
                >
                    Profil
                </button>
                <button
                    onClick={() => navigate("/nn/start")}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-stone-300 to-neutral-500 text-white text-lg font-medium"
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

export default NNProfil;
