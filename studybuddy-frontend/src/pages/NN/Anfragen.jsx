import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NNAnfragen = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("ausstehend");
    const [anfragen, setAnfragen] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchAnfragen = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/auth/anfragen-von/${user._id}`);
                const data = await res.json();
                setAnfragen(data);
            } catch (err) {
                console.error("Fehler beim Laden der Anfragen:", err);
            }
        };

        fetchAnfragen();
    }, [user._id]);

    const filtered = anfragen.filter((a) => a.status === tab);

    return (
        <div className="min-h-screen bg-white pb-20 pt-6 flex flex-col items-center">
            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
                {["angenommen", "ausstehend", "abgelehnt"].map((status) => (
                    <button
                        key={status}
                        className={`px-4 py-1 border rounded ${tab === status ? "bg-zinc-400" : "bg-zinc-300"}`}
                        onClick={() => setTab(status)}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Ergebnisliste */}
            <div className="w-full max-w-md mt-4 space-y-3 px-4">
                {filtered.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm mt-2">Keine Anfragen vorhanden</p>
                ) : (
                    filtered.map((a) => (
                        <div key={a._id} className="bg-zinc-200 rounded p-4">
                            <p className="font-bold">{a.an.vorname} {a.an.nachname}</p>

                            {/* Angenommen */}
                            {tab === "angenommen" && (
                                <>
                                    <p className="text-sm mt-2">
                                        ✔️ Du wurdest von <strong>{a.an.vorname} {a.an.nachname}</strong> angenommen –<br />
                                        klicke hier, um per E-Mail Kontakt aufzunehmen:
                                    </p>
                                    <a
                                        href={`mailto:${a.an.email}`}
                                        className="text-blue-600 underline text-sm mt-1 inline-block break-all"
                                    >
                                        {a.an.email}
                                    </a>
                                </>
                            )}

                            {/* Ausstehend */}
                            {tab === "ausstehend" && (
                                <p className="text-sm text-gray-700 mt-1">
                                    Deine Anfrage wurde noch nicht beantwortet.
                                </p>
                            )}

                            {/* Abgelehnt mit ✖️ Button */}
                            {tab === "abgelehnt" && (
                                <div className="flex justify-between items-start mt-2">
                                    <p className="text-sm text-red-600 w-full">
                                        ✖️ Du wurdest leider von <strong>{a.an.vorname} {a.an.nachname}</strong> abgelehnt.
                                    </p>
                                    <button
                                        onClick={async () => {
                                            try {
                                                await fetch(`http://localhost:5000/api/auth/anfrage/${a._id}`, {
                                                    method: "DELETE",
                                                });
                                                setAnfragen(prev => prev.filter(item => item._id !== a._id));
                                            } catch (err) {
                                                console.error("Fehler beim Löschen:", err);
                                                alert("Löschen fehlgeschlagen");
                                            }
                                        }}
                                        className="ml-3 text-white bg-red-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
                                        title="Anfrage entfernen"
                                    >
                                        ×
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full flex">
                <button
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-stone-300 to-neutral-500 text-white text-lg font-medium"
                    onClick={() => navigate("/nn/profil")}
                >
                    Profil
                </button>
                <button
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-stone-300 to-neutral-500 text-white text-lg font-medium"
                    onClick={() => navigate("/nn/start")}
                >
                    Startseite
                </button>
                <button className="w-1/3 h-14 bg-pink text-white text-lg font-medium">
                    Anfragen
                </button>
            </div>
        </div>
    );
};

export default NNAnfragen;
