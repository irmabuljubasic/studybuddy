const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 📌 Anfrage für Nachhilfe senden
exports.requestLesson = async (req, res) => {
    const { offerId, tutorId } = req.body;
    const studentId = req.user.id; // ID des anfragenden Schülers

    try {
        // Überprüfen, ob die Anfrage bereits existiert
        const existingRequest = await prisma.lessonRequest.findFirst({
            where: { studentId, offerId }
        });

        if (existingRequest) {
            return res.status(400).json({ message: "Anfrage wurde bereits gesendet!" });
        }

        // Anfrage erstellen
        const request = await prisma.lessonRequest.create({
            data: { studentId, tutorId, offerId, status: "pending" }
        });

        res.status(201).json({ message: "Anfrage gesendet!", request });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Senden der Anfrage!", error });
    }
};

// 📌 Eigene gesendete Anfragen abrufen
exports.myRequests = async (req, res) => {
    try {
        const requests = await prisma.lessonRequest.findMany({
            where: { studentId: req.user.id },
            include: { offer: true, tutor: true }
        });

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Anfragen!", error });
    }
};

// 📌 Anfragen für eigene Angebote abrufen
exports.requestsForMe = async (req, res) => {
    try {
        const requests = await prisma.lessonRequest.findMany({
            where: { tutorId: req.user.id },
            include: { offer: true, student: true }
        });

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Anfragen!", error });
    }
};

// 📌 Anfrage akzeptieren
exports.acceptRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await prisma.lessonRequest.update({
            where: { id },
            data: { status: "accepted" }
        });

        res.status(200).json({ message: "Anfrage akzeptiert!", request });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Akzeptieren der Anfrage!", error });
    }
};

// 📌 Anfrage ablehnen
exports.rejectRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const request = await prisma.lessonRequest.update({
            where: { id },
            data: { status: "rejected" }
        });

        res.status(200).json({ message: "Anfrage abgelehnt!", request });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Ablehnen der Anfrage!", error });
    }
};
