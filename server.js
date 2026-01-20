import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.post("/generate", async (req, res) => {
    const prompt = req.body.prompt;
    // Ici, tu appelles OpenAI pour générer le texte
    const result = `Vous avez écrit: ${prompt}`; // test temporaire
    res.json({ result });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
