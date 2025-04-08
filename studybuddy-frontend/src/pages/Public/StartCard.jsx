import logo from "../../assets/studybuddy-logo.png";
import { useNavigate } from "react-router-dom";

const StartCard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            {/* Logo */}
            <img src={logo} alt="StudyBuddy Logo" className="w-40 h-auto mb-6" />

            {/* Card */}
            <div className="w-80 bg-lightpink backdrop-blur-[2px] rounded-xl p-6 flex flex-col items-center gap-6 shadow-md">
                <div className="text-center">
                    <h2 className="text-white font-bold text-xl">STUDYBUDDY</h2>
                    <p className="text-white text-sm">CONNECT TO LEARN</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/auswahl")}
                        className="w-44 h-11 bg-pink shadow-md rounded text-white font-semibold hover:scale-105 transition"
                    >
                        Nachhilfe geben
                    </button>
                    <button
                        onClick={() => navigate("/auswahl")}
                        className="w-44 h-11 bg-pink shadow-md rounded text-white font-semibold hover:scale-105 transition"
                    >
                        Nachhilfe nehmen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartCard;
