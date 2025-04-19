import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NGProfilDetails = () => {
    const { id } = useParams();
    const [ng, setNg] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        const fetchNG = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/auth/ng/${id}`);
                const data = await response.json();
                setNg(data);
            } catch (error) {
                console.error("Fehler beim Laden des NG-Profils:", error);
            }
        };

        fetchNG();
    }, [id]);

    if (!ng) return <p>Lade Profil...</p>;

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4">
            {/* X Zurück Button */}
            <div className="self-end w-full max-w-md text-right mb-4">
                <button
                    onClick={() => {
                        if (state?.previousSearch) {
                            // zurück zur Startseite mit vorherigen Suchergebnis
                            navigate("/nn/start", { state: state.previousSearch });
                        } else {
                            navigate("/nn/start"); // fallback
                        }
                    }}
                    className="text-xl font-bold text-pink hover:scale-110 transition"
                >
                    X
                </button>
            </div>

            {/* Profil-Box */}
            <div className="w-80 bg-gray-200 p-4 rounded shadow">
                <h2 className="text-xl font-bold mb-2">{ng.vorname} {ng.nachname}</h2>
                <p><strong>Fächer:</strong> {ng.faecher?.join(", ")}</p>
                <p className="mt-2"><strong>Bemerkung:</strong> {ng.bemerkung || "Keine Bemerkung"}</p>
            </div>
        </div>
    );

};

export default NGProfilDetails;
