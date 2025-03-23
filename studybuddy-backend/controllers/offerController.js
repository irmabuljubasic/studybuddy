const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 📌 Nachhilfeangebot erstellen
exports.createOffer = async (req, res) => {
    const { subject, description } = req.body;
    const userId = req.user.id; // Nutzer-ID aus JWT-Token

    try {
        const offer = await prisma.offer.create({
            data: { subject, description, userId }
        });

        res.status(201).json({ message: "Nachhilfeangebot erstellt!", offer });
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Erstellen des Angebots!", error });
    }
};

// 📌 Alle Nachhilfeangebote abrufen
exports.findOffers = async (req, res) => {
    try {
        const offers = await prisma.offer.findMany({
            include: { user: true } // Benutzer-Info mit ausgeben
        });

        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ message: "Fehler beim Abrufen der Angebote!", error });
    }
};
