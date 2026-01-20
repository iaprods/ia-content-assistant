require("dotenv").config();           // charge les variables d'environnement
const express = require("express");   // serveur web
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Stripe sécurisé
const OpenAI = require("openai");     // OpenAI API

const app = express();
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Route test pour vérifier que le serveur fonctionne
app.get("/", (req, res) => {
  res.send("Backend IA opérationnel !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
