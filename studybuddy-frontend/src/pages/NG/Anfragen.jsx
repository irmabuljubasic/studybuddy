import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NGAnfragen = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [anfragen, setAnfragen] = useState([]);
    const ng = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchAnfragen = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/auth/anfragen/${ng._id}`);
                const data = await res.json();
                setAnfragen(data);
            } catch (err) {
                console.error("Fehler beim Laden:", err);
            }
        };

        fetchAnfragen();
    }, [ng._id]);

    return (
        <div className="min-h-screen bg-white p-4 relative">
            <h2 className="text-xl font-bold mb-4">Bitte beantworte folgende Anfragen:</h2>

            {/* Detailansicht */}
            {selected ? (
                <div className="w-full mt-6 bg-zinc-300 rounded-lg p-4 relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div>
                            <p className="font-bold">{selected.vorname} {selected.nachname}</p>
                        </div>
                        <button
                            onClick={() => setSelected(null)}
                            className="ml-auto text-sm bg-zinc-400 rounded-full w-6 h-6 text-white font-bold"
                        >
                            x
                        </button>
                    </div>
                    <p className="text-sm font-semibold">Fächer:</p>
                    <p className="text-sm mb-2">{selected.faecher?.join(", ") || "Keine Angabe"}</p>

                    <p className="text-sm font-semibold">Bemerkung:</p>
                    <p className="text-sm">{selected.bemerkung || "Keine Bemerkung"}</p>
                </div>
            ) : (
                // Listenansicht – nur Name + Icon
                anfragen.map((a) => (
                    <div
                        key={a._id}
                        className="bg-gray-200 p-4 mb-2 rounded flex justify-between items-center cursor-pointer"
                        onClick={() => setSelected(a.von)}
                    >
                        <div>
                            <p className="font-bold">{a.von.vorname} {a.von.nachname}</p>
                        </div>
                        <span className="text-2xl">✉️</span>
                    </div>
                ))
            )}

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full flex">
                <button
                    onClick={() => navigate("/ng/profil")}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-zinc-400 to-neutral-400 text-white text-lg font-medium"
                >
                    Profil
                </button>
                <button
                    onClick={() => navigate("/ng/start")}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-zinc-400 to-neutral-400 text-white text-lg font-medium"
                >
                    Startseite
                </button>
                <button
                    className="w-1/3 h-14 bg-pink text-white text-lg font-medium"
                >
                    Anfragen
                </button>
            </div>
        </div>
    );
};

export default NGAnfragen;
