// ===== Personal API — Frontend Logic =====

// Mobile navigation toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// Live demo: ping the FastAPI backend
const API_BASE = ""; // same origin — start the backend with: uvicorn website:app --reload
const resultEl = document.getElementById("apiResult");
const nameInput = document.getElementById("nameInput");
const pingBtn = document.getElementById("pingBtn");

async function pingApi() {
  const name = nameInput.value.trim() || "World";
  resultEl.textContent = "Sending request…";
  try {
    const res = await fetch(`${API_BASE}/hello/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    resultEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    resultEl.textContent =
      `Could not reach the backend (${err.message}).\n` +
      `Start it with:  uvicorn website:app --reload\n` +
      `Then this page would have sent:  GET /hello/${name}`;
  }
}

pingBtn.addEventListener("click", pingApi);
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") pingApi();
});
