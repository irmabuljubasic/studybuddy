import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NNAnfragen = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("angenommen");

    const renderMessage = () => {
        switch (tab) {
            case "angenommen":
                return (
                    <p className="text-center text-lg font-medium mt-8 px-4">
                        Sie wurden angenommen und<br />
                        haben nun die Möglichkeit sie<br />
                        per Email zu kontaktieren!!
                    </p>
                );
            case "ausstehend":
                return (
                    <p className="text-center text-lg font-medium mt-8 px-4">
                        Ihre Anfrage wurde noch<br />
                        nicht beantwortet
                    </p>
                );
            case "abgelehnt":
                return (
                    <p className="text-center text-lg font-medium mt-8 px-4">
                        Sie wurden leider von folgenden<br />
                        Nachhilfe gebenden abgelehnt:
                    </p>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20 pt-6 flex flex-col items-center">
            {/* Tabs */}
            <div className="flex space-x-2 mb-4">
                <button
                    className={`px-4 py-1 border ${tab === "angenommen" ? "bg-zinc-400" : "bg-zinc-300"
                        }`}
                    onClick={() => setTab("angenommen")}
                >
                    angenommen
                </button>
                <button
                    className={`px-4 py-1 border ${tab === "ausstehend" ? "bg-zinc-400" : "bg-zinc-300"
                        }`}
                    onClick={() => setTab("ausstehend")}
                >
                    ausstehend
                </button>
                <button
                    className={`px-4 py-1 border ${tab === "abgelehnt" ? "bg-zinc-400" : "bg-zinc-300"
                        }`}
                    onClick={() => setTab("abgelehnt")}
                >
                    abgelehnt
                </button>
            </div>

            {/* Info Text */}
            {renderMessage()}

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
