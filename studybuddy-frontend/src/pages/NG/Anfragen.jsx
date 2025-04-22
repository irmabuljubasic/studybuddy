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

    const handleAntwort = async (anfrageId, status) => {
        try {
            const res = await fetch(`http://localhost:5000/api/auth/anfrage/${anfrageId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();
            if (res.ok) {
                setAnfragen((prev) => prev.filter((a) => a._id !== anfrageId));
                setSelected(null);
                alert(`Anfrage wurde ${status === "angenommen" ? "angenommen ✅" : "abgelehnt ❌"}`);
            } else {
                alert("Fehler: " + data.message);
            }
        } catch (err) {
            console.error("Antwort-Fehler:", err);
            alert("Etwas ist schiefgelaufen.");
        }
    };

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
                    <p className="text-sm mb-4">{selected.bemerkung || "Keine Bemerkung"}</p>

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleAntwort(selected.anfrageId, "angenommen")}
                            className="bg-pink text-white px-4 py-2 rounded-full font-bold"
                        >
                            ✔️ Annehmen
                        </button>
                        <button
                            onClick={() => handleAntwort(selected.anfrageId, "abgelehnt")}
                            className="bg-gray-500 text-white px-4 py-2 rounded-full font-bold"
                        >
                            ✖️ Ablehnen
                        </button>
                    </div>
                </div>
            ) : (
                // Listenansicht – nur Name + Icon
                anfragen.map((a) => (
                    <div
                        key={a._id}
                        className="bg-gray-200 p-4 mb-2 rounded flex justify-between items-center cursor-pointer"
                        onClick={() => setSelected({ ...a.von, anfrageId: a._id })}
                    >
                        <div>
                            <p className="font-bold">{a.von.vorname} {a.von.nachname}</p>
                        </div>
                        <span className="text-2xl">💌</span>
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
