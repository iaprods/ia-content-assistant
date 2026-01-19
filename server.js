const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const Stripe = require("stripe");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Route test simple
app.get("/", (req, res) => {
  res.json({ status: "online", message: "ProdIA backend running" });
});

// Route création contenu IA
app.post("/api/message", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-5-mini",
        messages: [{ role: "user", content: message }],
        max_tokens: 500
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur IA" });
  }
});

// Route Stripe Checkout pour abonnement / crédits
app.post("/api/checkout", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
      success_url: "https://tonfrontend.com/success",
      cancel_url: "https://tonfrontend.com/cancel"
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur Stripe" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ProdIA backend running on port ${port}`));
