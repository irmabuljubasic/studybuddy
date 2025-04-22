import React, { useState, useEffect } from "react";
import Select from "react-select";
import logo from "../../assets/studybuddy-logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const fächerOptions = [
    { value: "Mathe", label: "Mathe" },
    { value: "Deutsch", label: "Deutsch" },
    { value: "Englisch", label: "Englisch" },
    { value: "NW", label: "NW" },
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

    const [results, setResults] = useState([]);

    const location = useLocation();

    useEffect(() => {
        if (location.state?.faecher) {
            setSelectedSubjects(location.state.faecher);
        }
        if (location.state?.results) {
            setResults(location.state.results);
        }
    }, []);

    const handleSearch = async () => {
        const faecher = selectedSubjects.map((s) => s.value); // Fächer aus dem Dropdown
      
        try {
          const response = await fetch("http://localhost:5000/api/auth/ngs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ faecher }),  // Fach an Backend übergeben
          });
      
          const data = await response.json();
          if (response.ok) {
            setResults(data);  // Setze die Suchergebnisse
          } else {
            alert("Fehler bei der Suche: " + data.message);
          }
        } catch (error) {
          console.error("Fehler beim Suchen:", error);
          alert("Etwas ist schiefgelaufen.");
        }
      };
      
      
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const handleAnfrage = async (ngId) => {
        console.log("vonId:", currentUser?._id);
        console.log("anId:", ngId);
        try {
            const response = await fetch("http://localhost:5000/api/auth/anfrage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ vonId: currentUser._id, anId: ngId }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Anfrage gesendet!");
            } else {
                alert("Fehler: " + data.message);
            }
        } catch (err) {
            console.error("Anfrage fehlgeschlagen", err);
            alert("Fehler beim Senden.");
        }
    };

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

                <button
                    onClick={handleSearch}
                    className="mt-4 bg-pink text-white px-4 py-2 rounded shadow"
                >
                    Nachhilfegeber finden
                </button>

            </div>

            {results.length > 0 && (
                <div className="w-full mt-4 flex flex-col items-center gap-4">
                    {results.map((ng) => (
                        <div key={ng._id} className="w-72 bg-gray-200 rounded p-4 shadow flex justify-between items-center">
                            <div>
                                <div className="font-bold text-black">{ng.vorname} {ng.nachname}</div>
                                <div className="text-sm text-black">{ng.faecher.join(", ")}</div>
                            </div>
                            <button
                                className="bg-pink text-white px-4 py-1 rounded"
                                onClick={() =>
                                    navigate(`/nn/ng/${ng._id}`, {
                                        state: {
                                            previousSearch: {
                                                faecher: selectedSubjects,
                                                results: results
                                            }
                                        }
                                    })
                                }

                            >
                                ansehen
                            </button>

                            <button
                                className="bg-pink text-white px-3 py-1 rounded-full mr-2"
                                onClick={() => handleAnfrage(ng._id)}
                            >
                                📩
                            </button>



                        </div>
                    ))}
                </div>
            )}


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
