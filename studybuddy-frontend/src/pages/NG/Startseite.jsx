import logo from "../../assets/studybuddy-logo.png";
import { useNavigate } from "react-router-dom";

const NGStartseite = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white">
            {/* Platzhalter für spätere Inhalte */}
            <div className="flex-grow flex items-center justify-center">
                <img src={logo} alt="StudyBuddy Logo" className="w-72 h-auto mt-6" />
            </div>

            {/* Bottom Nav */}
            <div className="w-full h-14 flex fixed bottom-0 left-0">
                <button
                    onClick={() => navigate("/ng/profil")}
                    className="w-1/3 bg-gradient-to-b from-zinc-300 via-zinc-400 to-neutral-400 text-zinc-300 text-lg font-medium"
                >
                    Profil
                </button>
                <button
                    className="w-1/3 h-14 bg-pink text-white text-lg font-medium"
                    disabled
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

export default NGStartseite;
