import logo from "../assets/studybuddy-logo.png";

const StartScreen = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 pt-20 gap-8">
            {/* Logo oben */}
            <img src={logo} alt="StudyBuddy Logo" className="w-28 h-auto" />

            {/* Card */}
            <div className="w-72 bg-lightpink backdrop-blur-[2px] rounded-xl p-6 flex flex-col items-center gap-6 shadow-md">
                <div className="text-center">
                    <h2 className="text-white font-bold text-lg">STUDYBUDDY</h2>
                    <p className="text-white text-sm">CONNECT TO LEARN</p>
                </div>

                <div className="flex flex-col gap-3">
                    <button className="w-44 h-11 bg-pink shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded text-white font-semibold">
                        Nachhilfe geben
                    </button>
                    <button className="w-44 h-11 bg-pink shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded text-white font-semibold">
                        Nachhilfe nehmen
                    </button>
                 
                </div>
            </div>
        </div>
    );
};

export default StartScreen;
