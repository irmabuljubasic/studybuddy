import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyAnfragen = [
    {
        id: 1,
        name: "Lea Müller",
        fach: "Mathe",
        bemerkung: "Ich brauche Hilfe bei Funktionen.",
    },
    {
        id: 2,
        name: "Tom Bauer",
        fach: "Infi",
        bemerkung: "Verstehe Klassen nicht ganz.",
        foto: "👨‍💻",
    },
    {
        id: 3,
        name: "Lena Schmidt",
        fach: "Deutsch",
        bemerkung: "Texterörterung üben",
        foto: "📚",
    },
];

const NGAnfragen = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen bg-white p-4 relative">
            {/* Detailansicht */}
            {selected ? (
                <div className="w-full mt-6 bg-zinc-300 rounded-lg p-4 relative">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-xl">
                            {selected.foto}
                        </div>
                        <div>
                            <p className="font-bold">{selected.name}</p>
                            <p className="text-sm">Fach: {selected.fach}</p>
                        </div>
                        <button
                            onClick={() => setSelected(null)}
                            className="ml-auto text-sm bg-zinc-300 rounded-full w-6 h-6 text-black"
                        >
                            x
                        </button>
                    </div>
                    <p className="text-sm font-semibold">Bemerkung:</p>
                    <p className="text-sm">{selected.bemerkung}</p>
                </div>
            ) : (
                <div className="mt-6 space-y-4">
                    {dummyAnfragen.map((anfrage) => (
                        <div
                            key={anfrage.id}
                            onClick={() => setSelected(anfrage)}
                            className="bg-neutral-200 p-4 rounded-lg flex items-center justify-between cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-xl">
                                    {anfrage.foto}
                                </div>
                                <div>
                                    <p className="font-bold">{anfrage.name}</p>
                                    <p className="text-sm">{anfrage.fach}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-pink rounded-full text-white flex items-center justify-center font-bold">
                                    o
                                </div>
                                <div className="w-10 h-10 bg-neutral-500 rounded-full text-white flex items-center justify-center font-bold">
                                    x
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
