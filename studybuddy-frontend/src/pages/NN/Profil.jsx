import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import logo from "../../assets/studybuddy-logo.png";

const NNProfil = () => {
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [selectedSubjects, setSelectedSubjects] = useState(
        user?.faecher?.map((fach) => ({ value: fach, label: fach })) || []
    );

    const saveSubjects = () => {
        const updated = {
            ...user,
            faecher: selectedSubjects.map((s) => s.value),
        };
        localStorage.setItem("user", JSON.stringify(updated));
        setUser(updated);
        setEditMode(false);
    };

    const subjects = [
        "Mathe", "Deutsch", "Englisch", "NW(Chemie, Physik)", "Ggp", "Infi", "Swp",
        "Ufw1", "Ufw2", "Bet", "Bdda", "Kobe", "Maa1", "Mela", "Mt", "Nwes", "Amec",
        "Wsft", "Rsor", "Sein"
    ].map((fach) => ({ value: fach, label: fach }));

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center pb-20">
                    <img src={logo} alt="StudyBuddy Logo" className="w-48 mt-8" />
        
                    <div className="w-80 bg-gray-200 rounded p-3 flex items-center gap-4 shadow-md mt-4">
                        <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-xs">
                            Foto
                        </div>
                        <div className="flex flex-col">
                            <span className="text-black font-bold leading-none">{user?.vorname}</span>
                            <span className="text-black font-bold leading-none">{user?.nachname}</span>
                            <span className="text-black text-sm leading-none">{user?.email}</span>
                        </div>
                        <button className="ml-auto bg-pink text-white text-sm px-2 py-1 rounded">löschen</button>
                    

                {/* Fächer bearbeiten */}
                <div className="w-80 mt-4">
                    <label className="block font-semibold text-black mb-1">Fächer</label>
                    {editMode ? (
                        <>
                            <Select
                                options={subjects}
                                isMulti
                                value={selectedSubjects}
                                onChange={setSelectedSubjects}
                                className="mt-1"
                            />
                            <div className="text-right text-sm mt-1 text-blue-600 cursor-pointer" onClick={saveSubjects}>
                                speichern
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="w-full bg-zinc-300 p-2 rounded text-black min-h-[3rem]">
                                {user?.faecher?.length > 0 ? user.faecher.join(", ") : "Keine Fächer angegeben"}
                            </div>
                            <div className="text-right text-sm mt-1 text-blue-600 cursor-pointer" onClick={() => setEditMode(true)}>
                                bearbeiten
                            </div>
                        </>
                    )}
                </div>

                {/* Bemerkung */}
                <div className="w-80 mt-6">
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
            </div>

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
