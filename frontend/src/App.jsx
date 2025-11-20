import React, { useState, useEffect } from "react";
import { getQuestions, getResults, saveResult } from "./api";
import "./App.css";

export default function App() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [results, setResults] = useState([]);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [stage, setStage] = useState("menu");

  const topics = [
    { id: "fullstack", name: "FullStack-ohjelmointi" },
    { id: "historia", name: "Historia" },
    { id: "elokuvat", name: "Elokuvat" },
  ];

  async function startGame() {
    if (!topic) return alert("Valitse ensin aihe!");
    const q = await getQuestions(topic);

    if (!Array.isArray(q) || q.length === 0) {
      alert("Kysymyksiä ei löytynyt valitulle aiheelle.");
      return;
    }

    // Satunnaista kysymykset ja ota 10 ensimmäistä
    setQuestions(q.sort(() => Math.random() - 0.5).slice(0, 10));
    setCurrent(0);
    setCorrect(0);
    setStartTime(Date.now());
    setStage("quiz");
  }

  function answerQuestion(isCorrect) {
    if (isCorrect) setCorrect((c) => c + 1);
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      finishGame();
    }
  }

  async function finishGame() {
    const totalTime = (Date.now() - startTime) / 1000;
    setEndTime(totalTime);
    setStage("end");

    const res = await getResults(topic);
    const top10 = res
      .sort(
        (a, b) =>
          b.correct_count - a.correct_count ||
          a.time_seconds - b.time_seconds
      )
      .slice(0, 10);

    const isTop10 =
      top10.length < 10 ||
      correct > top10[top10.length - 1].correct_count;

    if (isTop10) setShowForm(true);
    setResults(top10);
  }

  async function submitResult() {
    if (!username) return alert("Anna käyttäjänimi!");
    await saveResult({
      username,
      category: topic,
      correct_count: correct,
      time_seconds: endTime,
    });
    setShowForm(false);
    setStage("menu");
    setUsername("");
  }

  useEffect(() => {
    async function fetchResults() {
      if (topic) {
        const res = await getResults(topic);
        setResults(
          res
            .sort(
              (a, b) =>
                b.correct_count - a.correct_count ||
                a.time_seconds - b.time_seconds
            )
            .slice(0, 10)
        );
      }
    }
    fetchResults();
  }, [topic]);

  return (
    <div>
      <h1>Tietovisa</h1>

      {stage === "menu" && (
        <div>
          <h2>Valitse aihealue</h2>
          {topics.map((t) => (
            <button key={t.id} onClick={() => setTopic(t.id)}>
              {t.name} {topic === t.id && "(valittu)"}
            </button>
          ))}
          <div>
            <button onClick={startGame}>Aloita tietovisa</button>
          </div>
          {topic && (
            <div>
              <h3>TOP-10 tulokset ({topic})</h3>
              <ul>
                {results.map((r, i) => (
                  <li key={i}>
                    {i + 1}. {r.username} — {r.correct_count} oikein (
                    {r.time_seconds}s)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {stage === "quiz" && questions.length > 0 && (
        <div>
          <h3>Kysymys {current + 1}/10</h3>
          <p>{questions[current].question}</p>
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => answerQuestion(questions[current].correct === opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {stage === "end" && (
        <div>
          <h2>Visasi on päättynyt!</h2>
          <p>
            Oikeita vastauksia: {correct} / {questions.length}
          </p>
          <p>Aika: {endTime}s</p>

          {showForm ? (
            <div>
              <p>Sait TOP-10 tuloksen! Anna nimesi:</p>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button onClick={submitResult}>Tallenna</button>
            </div>
          ) : (
            <button onClick={() => setStage("menu")}>
              Takaisin valikkoon
            </button>
          )}
        </div>
      )}
    </div>
  );
}
