import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Select from "react-select";
import logo from "../../assets/studybuddy-logo.png";

const NGProfil = () => {
    const navigate = useNavigate();

    const [editMode, setEditMode] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [selectedSubjects, setSelectedSubjects] = useState(
        user?.faecher?.map((fach) => ({ value: fach, label: fach })) || []
    );

    const [editBemerkung, setEditBemerkung] = useState(false);
    const [bemerkung, setBemerkung] = useState(user?.bemerkung || "");

    //Profil löschen
    const handleDelete = async () => {
        const confirm = window.confirm("Möchtest du dein Profil wirklich endgültig löschen?");
        if (!confirm) return;

        try {
            const response = await fetch("http://localhost:5000/api/auth/delete/" + user.email, {
                method: "DELETE",
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem("user");
                localStorage.removeItem("rolle");
                alert("Profil gelöscht");
                navigate("/"); // zurück zur StartCard
            } else {
                alert("Fehler beim Löschen: " + data.message);
            }
        } catch (error) {
            console.error("Fehler beim Löschen:", error);
            alert("Ein Fehler ist aufgetreten.");
        }
    };


    //Fächer bearbeitung speichern
    const saveSubjects = async () => {
        const updated = {
            ...user,
            faecher: selectedSubjects.map((s) => s.value),
        };

        try {
            const response = await fetch("http://localhost:5000/api/auth/update/" + user.email, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vorname: updated.vorname,
                    nachname: updated.nachname,
                    email: updated.email,
                    faecher: updated.faecher,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                setEditMode(false);
            } else {
                alert("Fehler beim Speichern: " + data.message);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren:", error);
            alert("Ein Fehler ist aufgetreten.");
        }
    };

    //Bemerkung bearbeiten
    const saveBemerkung = async () => {
        const updated = {
            ...user,
            bemerkung: bemerkung,
        };

        try {
            const response = await fetch("http://localhost:5000/api/auth/update/" + user.email, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vorname: updated.vorname,
                    nachname: updated.nachname,
                    email: updated.email,
                    faecher: updated.faecher,
                    bemerkung: updated.bemerkung,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                setBemerkung(data.user.bemerkung || "");
                setEditBemerkung(false);
            } else {
                alert("Fehler beim Speichern: " + data.message);
            }
        } catch (error) {
            console.error("Fehler beim Aktualisieren:", error);
            alert("Ein Fehler ist aufgetreten.");
        }
    };



    const subjects = [
        "Mathe", "Deutsch", "Englisch", "NW(Chemie, Physik)", "Ggp", "Infi", "Swp",
        "Ufw1", "Ufw2", "Bet", "Bdda", "Kobe", "Maa1", "Mela", "Mt", "Nwes", "Amec",
        "Wsft", "Rsor", "Sein"
    ].map((fach) => ({ value: fach, label: fach }));

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center pb-20">
            <img src={logo} alt="StudyBuddy Logo" className="w-40 mt-8" />

            {/* Profil Header */}
            <div className="w-80 bg-gray-200 rounded p-4 flex flex-col items-center shadow-md mt-4">

                <span className="text-black font-bold text-lg">{user?.vorname} {user?.nachname}</span>
                <span className="text-black text-sm">{user?.email}</span>
            </div>

            {/* Löschen Button */}
            <button
                className="mt-3 bg-pink text-white text-sm px-4 py-1 rounded shadow"
                onClick={handleDelete}
            >
                löschen
            </button>

            {/* Fächer Box */}
            <div className="w-80 bg-zinc-200 rounded p-4 mt-8">
                <div className="flex justify-between items-start mb-2">
                    <label className="block font-semibold text-black">Fächer</label>
                    <span
                        className="text-sm text-blue-600 cursor-pointer"
                        onClick={() => editMode ? saveSubjects() : setEditMode(true)}
                    >
                        {editMode ? "speichern" : "bearbeiten"}
                    </span>
                </div>
                {editMode ? (
                    <Select
                        options={subjects}
                        isMulti
                        value={selectedSubjects}
                        onChange={setSelectedSubjects}
                        className="text-sm"
                    />
                ) : (
                    <div className="min-h-[3rem] text-black">
                        {user?.faecher?.length > 0 ? user.faecher.join(", ") : "Keine Fächer angegeben"}
                    </div>
                )}
            </div>

            {/* Bemerkung Box */}
            <div className="w-80 bg-zinc-200 rounded p-4 mt-4">
                <div className="flex justify-between items-start mb-2">
                    <label className="block font-semibold text-black">Bemerkung</label>
                    <span
                        className="text-sm text-blue-600 cursor-pointer"
                        onClick={() => editBemerkung ? saveBemerkung() : setEditBemerkung(true)}
                    >
                        {editBemerkung ? "speichern" : "bearbeiten"}
                    </span>
                </div>
                {editBemerkung ? (
                    <textarea
                        value={bemerkung}
                        onChange={(e) => setBemerkung(e.target.value)}
                        className="w-full h-24 bg-zinc-300 rounded px-2 py-1 text-black"
                    />
                ) : (
                    <div className="min-h-[3rem] text-black whitespace-pre-wrap">
                        {bemerkung || "z.B.: Ich bin in der 5ten Schulstufe und bin gut in diesen Themengebieten...."}
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 w-full flex">
                <button className="w-1/3 h-14 bg-pink text-white text-lg font-medium">Profil</button>
                <button
                    onClick={() => navigate("/ng/start")}
                    className="w-1/3 h-14 bg-gradient-to-b from-zinc-300 via-zinc-400 to-neutral-400 text-white text-lg font-medium"
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

export default NGProfil;
