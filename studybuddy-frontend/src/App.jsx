import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// All
import StartCard from "./pages/Public/StartCard";
import Login from "./pages/Public/Login";
import Register from "./pages/Public/Register";

// NG
import NGStart from "./pages/NG/Startseite";
import NGAnfragen from "./pages/NG/Anfragen";
import NGProfil from "./pages/NG/Profil";

// NN
import NNStart from "./pages/NN/Startseite";
import NNAnfragen from "./pages/NN/Anfragen";
import NNProfil from "./pages/NN/Profil";

// Admin
// import AdminDashboard from "./pages/Admin/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<StartCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Nachhilfe-Gebende (N.g) */}
        <Route path="/ng/start" element={<NGStart />} />
        <Route path="/ng/anfragen" element={<NGAnfragen />} />
        <Route path="/ng/profil" element={<NGProfil />} />

        {/* Nachhilfe-Nehmende (N.n) */}
        <Route path="/nn/start" element={<NNStart />} />
        <Route path="/nn/anfragen" element={<NNAnfragen />} />
        <Route path="/nn/profil" element={<NNProfil />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
