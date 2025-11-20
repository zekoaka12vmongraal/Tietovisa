const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getQuestions(topic) {
  const res = await fetch(`${API_BASE_URL}/api/questions/${topic}`);
  return await res.json();
}

export async function getResults(topic) {
  const res = await fetch(`${API_BASE_URL}/api/results/${topic}`);
  return await res.json();
}

export async function saveResult(data) {
  const res = await fetch(`${API_BASE_URL}/api/results`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}
