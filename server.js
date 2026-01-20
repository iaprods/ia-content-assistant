import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route test (OBLIGATOIRE)
app.get("/", (req, res) => {
  res.send("Backend IA opérationnel 🚀");
});

// Route IA
app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt manquant" });
  }

  // TEST SIMPLE (sans IA pour l’instant)
  res.json({
    result: `Réponse IA simulée pour : "${prompt}"`
  });
});

// ⚠️ PORT RAILWAY (CRITIQUE)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
