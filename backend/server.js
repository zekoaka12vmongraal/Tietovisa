import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import 'cross-fetch/dist/node-polyfill.js';     // ⭐ FIX: pakottaa fetchin toimimaan Node:ssa
import { createClient } from "@supabase/supabase-js";

dotenv.config();

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// --- API routes ---

// Hae kysymykset tietyn kategorian perusteella
app.get("/api/questions/:category", async (req, res) => {
  const { category } = req.params;
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .ilike("category", category);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Hae top-10 tulokset
app.get("/api/results/:category", async (req, res) => {
  const { category } = req.params;
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("category", category)
    .order("correct", { ascending: false })
    .order("time", { ascending: true })
    .limit(10);

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Tallenna uusi tulos
app.post("/api/results", async (req, res) => {
  const { username, category, correct, time } = req.body;
  const { error } = await supabase.from("results").insert([{ username, category, correct, time }]);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Tulos tallennettu" });
});

// --- Automaattinen seed ---

app.get("/api/seed", async (req, res) => {
  const questions = [
  // FullStack
  { category: "fullstack", question: "Mikä on Reactin hook, jolla hallitaan komponentin tilaa?", options: ["useState", "setState", "useEffect"], correct: "useState" },
  { category: "fullstack", question: "Mihin Node.js perustuu?", options: ["Python", "Chrome V8 -moottori", "Ruby"], correct: "Chrome V8 -moottori" },
  { category: "fullstack", question: "Mikä on Express?", options: ["Tietokanta", "Node.js:n web-framework", "CSS-kirjasto"], correct: "Node.js:n web-framework" },

  // Historia
  { category: "historia", question: "Kuka oli Suomen ensimmäinen presidentti?", options: ["Mannerheim", "Kallio", "Ståhlberg"], correct: "Ståhlberg" },
  { category: "historia", question: "Milloin toinen maailmansota alkoi?", options: ["1939", "1945", "1914"], correct: "1939" },
  { category: "historia", question: "Missä tapahtui Ranskan vallankumous?", options: ["Pariisi", "Rooma", "Lontoo"], correct: "Pariisi" },

  // Elokuvat
  { category: "elokuvat", question: "Kuka ohjasi elokuvan Inception?", options: ["Christopher Nolan", "Steven Spielberg", "James Cameron"], correct: "Christopher Nolan" },
  { category: "elokuvat", question: "Mikä Star Wars -hahmo sanoo 'I am your father'?", options: ["Luke Skywalker", "Darth Vader", "Han Solo"], correct: "Darth Vader" },
  { category: "elokuvat", question: "Mikä elokuva voitti parhaan elokuvan Oscarin vuonna 1994?", options: ["Forrest Gump", "Pulp Fiction", "Braveheart"], correct: "Forrest Gump" },
];


  const { error } = await supabase.from("questions").insert(questions);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Kysymykset lisätty Supabaseen!" });
});

// --- Käynnistä palvelin ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend toimii portissa ${PORT}`));
