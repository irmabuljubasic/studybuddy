import logo from "../../assets/studybuddy-logo.png";
import { useNavigate } from "react-router-dom";

const Auswahl = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <img src={logo} alt="StudyBuddy Logo" className="w-40 h-auto mb-6" />

            <div className="w-80 bg-lightpink rounded-xl p-6 flex flex-col items-center gap-6 shadow-md">
                <h2 className="text-white font-bold text-xl">STUDYBUDDY</h2>
                <p className="text-white text-sm">CONNECT TO LEARN</p>

                <div className="flex flex-col gap-4 w-full items-center">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-48 h-12 bg-pink text-white font-semibold rounded shadow-md hover:scale-105 transition"
                    >
                        Anmelden
                    </button>

                    <button
                        onClick={() => navigate("/register")}
                        className="w-48 h-12 bg-pink text-white font-semibold rounded shadow-md hover:scale-105 transition"
                    >
                        Registrieren
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Auswahl;
