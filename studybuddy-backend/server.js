const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

// Controllers & Middleware
const authController = require('./controllers/authController');
const { authMiddleware } = require('./middleware/authMiddleware');
const offerController = require('./controllers/offerController');
const requestController = require('./controllers/requestController');

// Prisma & Express Setup
dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

// Auth-Routen
app.post('/register', authController.register);
app.post('/login', authController.login);

//  Angebots-Routen
app.post('/create-offer', authMiddleware, offerController.createOffer);
app.get('/find-offers', offerController.findOffers);

//  Anfrage-Routen
app.post('/request-lesson', authMiddleware, requestController.requestLesson);
app.get('/my-requests', authMiddleware, requestController.myRequests);
app.get('/requests-for-me', authMiddleware, requestController.requestsForMe);
app.patch('/accept-request/:id', authMiddleware, requestController.acceptRequest);
app.patch('/reject-request/:id', authMiddleware, requestController.rejectRequest);

//  Benutzerprofil Route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ message: "Willkommen im geschützten Bereich!", user: req.user });
});

// Angebote-API in einer separaten Router-Datei
const offerRouter = express.Router();

//  Alle Angebote abrufen
offerRouter.get("/", async (req, res) => {
  try {
    const offers = await prisma.offer.findMany();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Laden der Angebote", error });
  }
});

//  Neues Angebot erstellen (nur eingeloggte Nutzer)
offerRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const newOffer = await prisma.offer.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        subject: req.body.subject,
        price: req.body.price,
        tutorId: req.user.id,
      }
    });
    res.json(newOffer);
  } catch (error) {
    res.status(500).json({ message: "Fehler beim Erstellen des Angebots", error });
  }
});

//  Binde den Angebots-Router ein
app.use("/offers", offerRouter);

//  Benutzer-Route
app.get("/user", authMiddleware, async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { id: true, firstName: true, lastName: true, email: true }
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Serverfehler", error });
    }
});

//  Benutzer-Registrierung direkt in server.js
app.post('/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) return res.status(400).json({ message: 'Benutzer existiert bereits' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { email, password: hashedPassword, firstName, lastName }
        });
        res.status(201).json({ message: 'Benutzer erstellt', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Fehler bei der Registrierung', error });
    }
});

//  Benutzer-Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Ungültige Anmeldeinformationen' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Ungültige Anmeldeinformationen' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'supersecretkey', { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Login', error });
    }
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
