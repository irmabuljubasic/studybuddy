import logo from "../../assets/studybuddy-logo.png";

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            {/* Logo */}
            <img src={logo} alt="StudyBuddy Logo" className="w-40 h-auto mb-6" />

            {/* Card */}
            <div className="w-80 bg-white rounded-xl p-6 flex flex-col items-center gap-6 shadow-md">
                {/* Headline */}
                <div className="text-center">
                    <h2 className="text-pink font-bold text-xl">Login</h2>
                </div>

                {/* Input-Felder */}
                <div className="flex flex-col gap-4 w-full items-center">
                    <input
                        type="email"
                        placeholder="E-Mail-Adresse"
                        className="w-48 h-12 px-4 rounded bg-zinc-300 text-stone-700 placeholder-stone-600/50 text-sm focus:outline-none"
                    />
                    <input
                        type="password"
                        placeholder="Passwort"
                        className="w-48 h-12 px-4 rounded bg-zinc-300 text-stone-700 placeholder-stone-600/50 text-sm focus:outline-none"
                    />
                </div>

                {/* Button */}
                <button className="bg-pink text-white font-semibold px-6 py-2 rounded shadow-md hover:scale-105 transition">
                    Anmelden
                </button>
            </div>
        </div>
    );
};

export default Login;
