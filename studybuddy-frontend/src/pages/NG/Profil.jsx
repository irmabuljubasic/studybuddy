import { useNavigate } from "react-router-dom";
import logo from "../../assets/studybuddy-logo.png";

const NGProfil = () => {
    const navigate = useNavigate();

    const handleGoToStartseite = () => {
        const rolle = localStorage.getItem("rolle");

        if (rolle === "ng") {
            navigate("/ng/start");
        } else if (rolle === "nn") {
            navigate("/nn/start");
        }
    };


    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center">
            {/* Logo */}
            <img
                src={logo}
                alt="StudyBuddy Logo"
                className="w-48 mt-8"
            />

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

            {/* Fächer bearbeiten */}
            <div className="mt-8 w-72">
                <label className="text-base font-medium">Fächer</label>
                <select
                    multiple
                    className="w-full mt-2 h-14 bg-zinc-300 p-2 rounded text-black"
                >
                    <option>Mathe</option>
                    <option>Deutsch</option>
                    <option>Englisch</option>
                    <option>NW(Chemie, Physik)</option>
                    <option>Ggp</option>
                    <option>Infi</option>
                    <option>Swp</option>
                    <option>Ufw1</option>
                    <option>Ufw2</option>
                    <option>Bet</option>
                    <option>Bdda</option>
                    <option>Kobe</option>
                    <option>Maa1</option>
                    <option>Mela</option>
                    <option>Mt</option>
                    <option>Nwes</option>
                    <option>Amec</option>
                    <option>Wsft</option>
                    <option>Rsor</option>
                    <option>Sein</option>
                </select>
                <div className="text-right text-xs mt-1">speichern</div>
            </div>

            {/* Bemerkung */}
            <div className="mt-8 w-72">
                <label className="text-base font-medium">Bemerkung</label>
                <textarea
                    className="w-full mt-2 h-24 bg-zinc-300 p-2 rounded text-black"
                    placeholder="Kommentar hier..."
                ></textarea>
                <div className="flex justify-between text-xs mt-1">
                    <span>bearbeiten</span>
                    <span>speichern</span>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full flex">
                <button className="w-1/3 h-14 bg-pink text-white text-lg font-medium">
                    Profil
                </button>
                <button
                    onClick={() => {
                        const rolle = localStorage.getItem("rolle");
                        if (rolle === "ng") {
                            navigate("/ng/start");
                        } else if (rolle === "nn") {
                            navigate("/nn/start");
                        } else {
                            navigate("/"); // fallback zur StartCard
                        }
                    }}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-zinc-400 to-neutral-400 text-white text-lg font-medium"
                >
                    Startseite
                </button>

                <button
                    onClick={() => navigate("/ng/anfragen")}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-zinc-400 to-neutral-400 text-white text-lg font-medium"
                >
                    Anfragen
                </button>

            </div>
        </div>
    );
};

export default NGProfil;