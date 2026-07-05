import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/api/quote", async (req, res) => {
  try {
    const prompt = `
Generate one short islamic motivational quote for Muslims in hinglish.

Rules:
- Maximum 25 words.
- Positive tone.
- Return only the quote.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({
      quote: response.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      quote: "Failed to generate quote.",
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Server is running on http://localhost:5000");
});