import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// All
import StartCard from "./pages/Public/StartCard";
import Auswahl from "./pages/Public/Auswahl";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";

// NG
import NGStart from "./pages/NG/Startseite";
import NGAnfragen from "./pages/NG/Anfragen";
import NGProfil from "./pages/NG/Profil";

// NN
import NNStartseite from "./pages/NN/Startseite";
import NNAnfragen from "./pages/NN/Anfragen";
import NNProfil from "./pages/NN/Profil";
import NGProfilDetails from "./pages/NN/NGProfilDetails";

// Admin
import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StartCard />} />
        <Route path="/auswahl" element={<Auswahl />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Nachhilfe-Gebende (N.g) */}
        <Route path="/ng/start" element={<NGStart />} />
        <Route path="/ng/anfragen" element={<NGAnfragen />} />
        <Route path="/ng/profil" element={<NGProfil />} />

        {/* Nachhilfe-Nehmende (N.n) */}
        <Route path="/nn/start" element={<NNStartseite />} />
        <Route path="/nn/anfragen" element={<NNAnfragen />} />
        <Route path="/nn/profil" element={<NNProfil />} />
        <Route path="/nn/ng/:id" element={<NGProfilDetails />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
