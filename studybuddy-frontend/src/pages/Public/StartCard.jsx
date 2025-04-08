import { useNavigate } from "react-router-dom";
import logo from "../../assets/studybuddy-logo.png";

const StartCard = () => {
    const navigate = useNavigate();

    const handleNachhilfeGeben = () => {
        localStorage.setItem("rolle", "ng"); // Nachhilfe-Geber merken
        navigate("/auswahl");
    };

    const handleNachhilfeNehmen = () => {
        localStorage.setItem("rolle", "nn"); // Nachhilfe-Nehmer merken
        navigate("/auswahl");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-20 gap-8">
            {/* Logo */}
            <img src={logo} alt="StudyBuddy Logo" className="w-28 h-auto" />

            {/* Card */}
            <div className="w-72 bg-lightpink backdrop-blur-[2px] rounded-xl p-6 flex flex-col items-center gap-6 shadow-md">
                <div className="text-center">
                    <h2 className="text-white font-bold text-lg">STUDYBUDDY</h2>
                    <p className="text-white text-sm">CONNECT TO LEARN</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleNachhilfeGeben}
                        className="w-44 h-11 bg-pink shadow-md rounded text-white font-semibold"
                    >
                        Nachhilfe geben
                    </button>

                    <button
                        onClick={handleNachhilfeNehmen}
                        className="w-44 h-11 bg-pink shadow-md rounded text-white font-semibold"
                    >
                        Nachhilfe nehmen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartCard;
