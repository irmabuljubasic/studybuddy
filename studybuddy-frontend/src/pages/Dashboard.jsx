import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Fehler beim Abrufen des Nutzers", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">🎉 Willkommen im Dashboard!</h1>
      {user ? (
        <div className="bg-white p-6 rounded shadow-md text-center">
          <p className="text-xl">Hallo, {user.firstName} {user.lastName}!</p>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Abmelden
          </button>
        </div>
      ) : (
        <p>Lade Benutzerinfo...</p>
      )}
    </div>
  );
}

export default Dashboard;
