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
            <img src={logo} alt="StudyBuddy Logo" className="w-48 mt-8" />

            <div className="w-80 bg-gray-200 rounded p-3 flex items-center gap-4 shadow-md mt-4">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-xs">
                    Foto
                </div>
                <div className="flex flex-col">
                    <span className="text-black font-bold leading-none">{user?.vorname}</span>
                    <span className="text-black font-bold leading-none">{user?.nachname}</span>
                    <span className="text-black text-sm leading-none">{user?.email}</span>
                </div>
                <button className="ml-auto bg-pink text-white text-sm px-2 py-1 rounded">löschen</button>
            </div>

            <div className="mt-8 w-72">
                <label className="text-base font-medium">Fächer</label>
                {editMode ? (
                    <>
                        <Select
                            options={subjects}
                            isMulti
                            value={selectedSubjects}
                            onChange={setSelectedSubjects}
                            className="mt-2"
                        />
                        <div className="text-right text-sm mt-1 text-blue-600 cursor-pointer" onClick={saveSubjects}>
                            speichern
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full mt-2 bg-zinc-300 p-2 rounded text-black min-h-[3rem]">
                            {user?.faecher?.length > 0 ? user.faecher.join(", ") : "Keine Fächer angegeben"}
                        </div>
                        <div className="text-right text-sm mt-1 text-blue-600 cursor-pointer" onClick={() => setEditMode(true)}>
                            bearbeiten
                        </div>
                    </>
                )}
            </div>

            {/* Bemerkung */}
            <div className="w-80 mt-6">
                <label className="block font-semibold text-black mb-1">Bemerkung</label>
                {editBemerkung ? (
                    <>
                        <textarea
                            value={bemerkung}
                            onChange={(e) => setBemerkung(e.target.value)}
                            className="w-full h-24 bg-zinc-300 rounded px-2 py-1 text-black"
                        ></textarea>
                        <div
                            onClick={saveBemerkung}
                            className="text-right text-sm mt-1 text-blue-600 cursor-pointer"
                        >
                            speichern
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full bg-zinc-300 p-2 rounded text-black min-h-[3rem] whitespace-pre-wrap">
                            {bemerkung || "Keine Bemerkung vorhanden"}
                        </div>
                        <div
                            onClick={() => setEditBemerkung(true)}
                            className="text-right text-sm mt-1 text-blue-600 cursor-pointer"
                        >
                            bearbeiten
                        </div>
                    </>
                )}
            </div>


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
