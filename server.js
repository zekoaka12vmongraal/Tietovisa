import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'cross-fetch/dist/node-polyfill.js';     
import { createClient } from "@supabase/supabase-js";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// --- API routes --- (sama kuin aiemmin)
app.get("/api/questions/:category", async (req, res) => {
  const { category } = req.params;
  const { data, error } = await supabase.from("questions").select("*").ilike("category", category);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/api/results/:category", async (req, res) => {
  const { category } = req.params;
  const { data, error } = await supabase.from("results").select("*")
    .eq("category", category)
    .order("correct", { ascending: false })
    .order("time", { ascending: true })
    .limit(10);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.post("/api/results", async (req, res) => {
  const { username, category, correct, time } = req.body;
  const { error } = await supabase.from("results").insert([{ username, category, correct, time }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Tulos tallennettu" });
});

app.get("/api/seed", async (req, res) => {
  const questions = [
    // kysymykset sama kuin aiemmin
  ];
  const { error } = await supabase.from("questions").insert(questions);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Kysymykset lisätty Supabaseen!" });
});


// --- Käynnistä palvelin ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend toimii portissa ${PORT}`));
