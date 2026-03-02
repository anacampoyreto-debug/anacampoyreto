const STORAGE_KEY = "laura_ruta_agua_v3";

// ✅ Tu enlace del Google Form (ya puesto)
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScGpaW17ev8CQtmZeO9kCL__ta0d9NRx7-f4_Y6McBI8HK1MA/viewform?usp=publish-editor";

const missions = [
  {
    id: 1,
    day: 1,
    title: "Día 1 · El secreto de los ríos",
    badge: "Tigris y Éufrates",
    narrative: "Has llegado a la tierra entre dos ríos. Hoy descubres por qué el agua lo cambia todo.",
    microtext:
      "Mesopotamia nació entre los ríos Tigris y Éufrates. Gracias al agua se desarrolló la agricultura. Esto permitió que surgieran las primeras ciudades.",
    quiz: [
      { q: "Mesopotamia se desarrolló cerca de:", options: ["Montañas", "Ríos", "Desiertos"], answer: 1 },
      { q: "El agua permitió:", options: ["Construir pirámides", "Cultivar", "Escribir libros"], answer: 1 },
      { q: "Las primeras ciudades surgieron gracias a:", options: ["El comercio", "La agricultura", "El ejército"], answer: 1 }
    ],
    vocab: [
      { word: "Río", def: "Corriente de agua que atraviesa la tierra." },
      { word: "Agricultura", def: "Cultivar la tierra para obtener alimentos." }
    ],
    molds: [
      "Mesopotamia fue importante porque…",
      "Gracias a los ríos…, los habitantes pudieron…",
      "Esto permitió que…"
    ]
  },
  {
    id: 2,
    day: 2,
    title: "Día 2 · Quién tiene el poder",
    badge: "Ciudad-Estado",
    narrative: "Ahora entras en una ciudad. Hoy aprendes quién manda y cómo se organiza la sociedad.",
    microtext:
      "En Mesopotamia cada ciudad tenía su propio rey. El rey tenía poder político y militar. La sociedad estaba organizada en jerarquía.",
    quiz: [
      { q: "El rey tenía poder:", options: ["Religioso solamente", "Político y militar", "Económico solamente"], answer: 1 },
      { q: "La sociedad era:", options: ["Igualitaria", "Jerarquizada", "Democrática"], answer: 1 },
      { q: "Cada ciudad tenía:", options: ["Un faraón", "Un rey", "Un emperador"], answer: 1 }
    ],
    vocab: [
      { word: "Rey", def: "Persona que gobierna una ciudad o un territorio." },
      { word: "Jerarquía", def: "Organización con niveles: unos mandan más que otros." }
    ],
    molds: [
      "La sociedad estaba formada por…",
      "El rey tenía el poder de…",
      "Los campesinos…"
    ]
  },
  {
    id: 3,
    day: 3,
    title: "Día 3 · El viaje al Nilo",
    badge: "Transición",
    narrative: "Viajas hacia el Nilo. Hoy comparas: no todas las civilizaciones funcionan igual.",
    microtext:
      "Egipto se desarrolló junto al río Nilo. El faraón era considerado un dios. El Nilo hacía fértiles las tierras.",
    quiz: [
      { q: "Egipto se desarrolló junto al:", options: ["Tigris", "Éufrates", "Nilo"], answer: 2 },
      { q: "El faraón era considerado:", options: ["Un campesino", "Un dios", "Un comerciante"], answer: 1 },
      { q: "El Nilo hacía la tierra:", options: ["Seca", "Fértil", "Montañosa"], answer: 1 }
    ],
    vocab: [
      { word: "Nilo", def: "Río principal de Egipto, clave para la agricultura." },
      { word: "Faraón", def: "Rey de Egipto; concentraba el poder." }
    ],
    molds: [
      "En Mesopotamia…, mientras que en Egipto…",
      "Sin embargo, en Egipto…",
      "Gracias al Nilo…"
    ]
  },
  {
    id: 4,
    day: 4,
    title: "Día 4 · El consejo del agua",
    badge: "Síntesis final",
    narrative: "Has llegado al final: hoy explicas qué tienen en común y qué las diferencia.",
    microtext:
      "Mesopotamia tenía ciudades-Estado con reyes. Egipto estaba gobernado por un faraón. Ambas civilizaciones dependían del agua.",
    quiz: [
      { q: "En Mesopotamia gobernaban:", options: ["Faraones", "Reyes", "Sacerdotes"], answer: 1 },
      { q: "Egipto tenía:", options: ["Ciudades-Estado independientes", "Un único faraón", "Un parlamento"], answer: 1 },
      { q: "Ambas civilizaciones dependían de:", options: ["El comercio", "La agricultura", "El agua"], answer: 2 }
    ],
    vocab: [
      { word: "Ciudad-Estado", def: "Ciudad independiente con su propio gobierno." },
      { word: "Civilización hidráulica", def: "Civilización que depende del agua de los ríos." }
    ],
    molds: [
      "Mesopotamia y Egipto fueron civilizaciones hidráulicas porque…",
      "Sin embargo, tenían diferencias: en Mesopotamia… / en Egipto…",
      "En conclusión…"
    ]
  }
];

// 🎁 Sorpresas (objeto + palabra mágica + mini reto 1 frase)
const surprises = [
  { obj: "🌾 Un saco de semillas", magic: "FÉRTIL", challenge: "Escribe 1 frase con: Gracias a…" },
  { obj: "🧱 Un ladrillo de adobe", magic: "CIUDAD", challenge: "Escribe 1 frase con: Esto permitió que…" },
  { obj: "🪨 Una tablilla de arcilla", magic: "CUNEIFORME", challenge: "Escribe 1 frase con: Mientras que…" },
  { obj: "🏺 Una vasija", magic: "NILO", challenge: "Escribe 1 frase con: En cambio…" },
  { obj: "📜 Un papiro", magic: "JEROGLÍFICO", challenge: "Escribe 1 frase con: Sin embargo…" },
  { obj: "👑 Una corona", magic: "PODER", challenge: "Escribe 1 frase con: En conclusión…" }
];

function todayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function stableIndex(seedStr, mod) {
  let h = 0;
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0;
  return h % mod;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      selectedMissionId: 1,
      unlockedDay: 1,
      completed: {},
      dailyLog: {},
      notes: {},
      final: { declaration: "", sealed: false }
    };
  }
  try { return JSON.parse(raw); }
  catch {
    return {
      selectedMissionId: 1,
      unlockedDay: 1,
      completed: {},
      dailyLog: {},
      notes: {},
      final: { declaration: "", sealed: false }
    };
  }
}
function saveState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

let state = loadState();

// UI refs
const missionList = document.getElementById("missionList");
const missionTitle = document.getElementById("missionTitle");
const missionBadge = document.getElementById("missionBadge");
const missionNarrative = document.getElementById("missionNarrative");
const microtext = document.getElementById("microtext");
const quizForm = document.getElementById("quizForm");
const checkQuizBtn = document.getElementById("checkQuizBtn");
const quizFeedback = document.getElementById("quizFeedback");
const vocabGrid = document.getElementById("vocabGrid");
const moldsEl = document.getElementById("molds");
const writingEl = document.getElementById("writing");
const chkWord = document.getElementById("chkWord");
const chkConnector = document.getElementById("chkConnector");
const chkMoreThanOne = document.getElementById("chkMoreThanOne");
const identityLineEl = document.getElementById("identityLine");
const saveBtn = document.getElementById("saveBtn");
const markDoneBtn = document.getElementById("markDoneBtn");
const savedMsg = document.getElementById("savedMsg");
const progressFill = document.getElementById("progressFill");
const progressPct = document.getElementById("progressPct");
const unlockedCountEl = document.getElementById("unlockedCount");
const streakEl = document.getElementById("streak");
const progressNote = document.getElementById("progressNote");
const resetBtn = document.getElementById("resetBtn");
const formLink = document.getElementById("formLink");

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseBox = document.getElementById("surpriseBox");

const finalRitual = document.getElementById("finalRitual");
const finalDeclaration = document.getElementById("finalDeclaration");
const sealBtn = document.getElementById("sealBtn");
const sealMsg = document.getElementById("sealMsg");

function getMissionById(id) { return missions.find(m => m.id === id) || missions[0]; }
function isUnlocked(m) { return m.day <= state.unlockedDay; }

function renderFormLink() {
  if (!formLink) return;
  formLink.href = GOOGLE_FORM_URL;
}

function renderMissionList() {
  missionList.innerHTML = "";
  missions.forEach(m => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";

    const unlocked = isUnlocked(m);
    const done = !!state.completed[m.id];

    btn.disabled = !unlocked;
    btn.className = (m.id === state.selectedMissionId) ? "active" : "";
    btn.innerHTML = `${done ? "✅ " : (unlocked ? "" : "🔒 ")}${m.title}<span class="small">${m.badge}</span>`;

    btn.addEventListener("click", () => {
      if (!unlocked) return;
      state.selectedMissionId = m.id;
      saveState(state);
      renderAll();
    });

    li.appendChild(btn);
    missionList.appendChild(li);
  });
}

function renderMissionPanel() {
  let m = getMissionById(state.selectedMissionId);

  if (!isUnlocked(m)) {
    const fallback = missions.find(x => x.day === state.unlockedDay) || missions[0];
    state.selectedMissionId = fallback.id;
    saveState(state);
    m = fallback;
  }

  missionTitle.textContent = m.title;
  missionBadge.textContent = m.badge;
  missionNarrative.textContent = m.narrative;
  microtext.textContent = m.microtext;

  surpriseBox.innerHTML = `<span style="color:#8aa0c6;">Pulsa “Abrir sorpresa”.</span>`;

  // Quiz
  quizForm.innerHTML = "";
  const saved = (state.notes[m.id] && state.notes[m.id].quizAnswers) ? state.notes[m.id].quizAnswers : {};
  m.quiz.forEach((qItem, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "q";
    const title = document.createElement("p");
    title.className = "qTitle";
    title.textContent = `${idx + 1}. ${qItem.q}`;
    wrap.appendChild(title);

    qItem.options.forEach((opt, optIdx) => {
      const label = document.createElement("label");
      label.className = "opt";
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${idx}`;
      input.value = String(optIdx);
      if (saved[`q${idx}`] === optIdx) input.checked = true;

      input.addEventListener("change", () => {
        const note = state.notes[m.id] || {};
        const qa = note.quizAnswers || {};
        qa[`q${idx}`] = optIdx;
        note.quizAnswers = qa;
        state.notes[m.id] = note;
        saveState(state);
      });

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + opt));
      wrap.appendChild(label);
    });

    quizForm.appendChild(wrap);
  });
  quizFeedback.textContent = "";

  // Vocabulario
  vocabGrid.innerHTML = "";
  m.vocab.forEach(v => {
    const card = document.createElement("div");
    card.className = "vocabCard";
    card.innerHTML = `
      <div class="vocabWord">${v.word}</div>
      <div class="vocabDef">${v.def}</div>
      <label class="label">Mi frase</label>
      <input type="text" data-word="${v.word}" placeholder="Escribe una frase..." />
    `;
    vocabGrid.appendChild(card);
  });

  const note = state.notes[m.id] || {};
  const vocabPhrases = note.vocabPhrases || {};
  vocabGrid.querySelectorAll('input[data-word]').forEach(inp => {
    const w = inp.getAttribute("data-word");
    inp.value = vocabPhrases[w] || "";
    inp.addEventListener("input", () => {
      const n = state.notes[m.id] || {};
      n.vocabPhrases = n.vocabPhrases || {};
      n.vocabPhrases[w] = inp.value;
      state.notes[m.id] = n;
      saveState(state);
    });
  });

  // Moldes
  moldsEl.innerHTML = "";
  m.molds.forEach(text => {
    const div = document.createElement("div");
    div.className = "mold";
    div.textContent = text;
    moldsEl.appendChild(div);
  });

  // Restore writing + checks + identidad
  writingEl.value = note.writing || "";
  identityLineEl.value = note.identityLine || "";
  chkWord.checked = !!(note.checks && note.checks.word);
  chkConnector.checked = !!(note.checks && note.checks.connector);
  chkMoreThanOne.checked = !!(note.checks && note.checks.moreThanOne);
  savedMsg.textContent = "";

  // Ritual final Día 4
  if (m.day === 4) {
    finalRitual.style.display = "block";
    finalDeclaration.value = state.final.declaration || "";
    sealMsg.textContent = state.final.sealed ? "Sellado ✅. Has terminado tu Ruta del Agua." : "";
  } else {
    finalRitual.style.display = "none";
  }
}

function gradeQuiz(missionId) {
  const m = missions.find(x => x.id === missionId);
  if (!m) return { correct: 0, total: 0 };
  const note = state.notes[missionId] || {};
  const answers = note.quizAnswers || {};
  let correct = 0;
  m.quiz.forEach((qItem, idx) => {
    const a = answers[`q${idx}`];
    if (typeof a === "number" && a === qItem.answer) correct++;
  });
  return { correct, total: m.quiz.length };
}

function computeStreak() {
  const cur = new Date();
  let streak = 0;
  for (;;) {
    const iso = cur.toISOString().slice(0, 10);
    const log = state.dailyLog[iso];
    if (log && log.done) {
      streak++;
      cur.setDate(cur.getDate() - 1);
      continue;
    }
    break;
  }
  return streak;
}

function renderProgress() {
  const unlocked = Math.max(1, Math.min(4, state.unlockedDay));
  unlockedCountEl.textContent = `${unlocked}/4`;

  const completedCount = Object.values(state.completed).filter(Boolean).length;
  const pct = Math.round((completedCount / missions.length) * 100);
  progressFill.style.width = `${pct}%`;
  progressPct.textContent = `${pct}%`;

  const streak = computeStreak();
  streakEl.textContent = String(streak);

  const today = todayISO();
  const todayLog = state.dailyLog[today];
  progressNote.textContent = (todayLog && todayLog.done)
    ? "Hoy ya has completado tu día. 🌿"
    : "Hoy: microlectura + test + una redacción breve + cierre “soy capaz”.";
}

function showSurprise() {
  const m = getMissionById(state.selectedMissionId);
  const seed = `${todayISO()}-day${m.day}`;
  const idx = stableIndex(seed, surprises.length);
  const s = surprises[idx];

  surpriseBox.innerHTML = `
    <div class="mold">
      <div><strong>Objeto del día:</strong> ${s.obj}</div>
      <div style="margin-top:6px;"><strong>Palabra mágica:</strong> ${s.magic}</div>
      <div style="margin-top:6px;"><strong>Mini reto (1 frase):</strong> ${s.challenge}</div>
    </div>
  `;
}

function wireEvents() {
  checkQuizBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const g = gradeQuiz(state.selectedMissionId);
    if (g.correct === g.total) {
      quizFeedback.textContent = `Perfecto: ${g.correct}/${g.total}. ✅`;
      quizFeedback.style.color = "var(--good)";
    } else {
      quizFeedback.textContent = `Vas avanzando: ${g.correct}/${g.total}. Hoy entrenas, no te examinas.`;
      quizFeedback.style.color = "var(--warn)";
    }
  });

  surpriseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showSurprise();
  });

  writingEl.addEventListener("input", () => {
    const mId = state.selectedMissionId;
    const note = state.notes[mId] || {};
    note.writing = writingEl.value;
    state.notes[mId] = note;
    saveState(state);
  });

  identityLineEl.addEventListener("input", () => {
    const mId = state.selectedMissionId;
    const note = state.notes[mId] || {};
    note.identityLine = identityLineEl.value;
    state.notes[mId] = note;
    saveState(state);
  });

  function saveChecks() {
    const mId = state.selectedMissionId;
    const note = state.notes[mId] || {};
    note.checks = {
      word: chkWord.checked,
      connector: chkConnector.checked,
      moreThanOne: chkMoreThanOne.checked
    };
    state.notes[mId] = note;
    saveState(state);
  }
  chkWord.addEventListener("change", saveChecks);
  chkConnector.addEventListener("change", saveChecks);
  chkMoreThanOne.addEventListener("change", saveChecks);

  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    savedMsg.textContent = "Guardado. Hoy estás avanzando por tu ruta. 🌊";
  });

  markDoneBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const m = getMissionById(state.selectedMissionId);

    state.completed[m.id] = true;

    const iso = todayISO();
    state.dailyLog[iso] = { missionId: m.id, done: true };

    if (state.unlockedDay < 4 && m.day === state.unlockedDay) {
      state.unlockedDay = Math.min(4, state.unlockedDay + 1);
    }

    const next = missions.find(x => x.day === state.unlockedDay);
    if (next) state.selectedMissionId = next.id;

    saveState(state);
    renderAll();
    savedMsg.textContent = "Día completado ✅. Hoy eres un poco más capaz que ayer.";
  });

  finalDeclaration.addEventListener("input", () => {
    state.final.declaration = finalDeclaration.value;
    saveState(state);
  });

  sealBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const day4Done = !!state.completed[4];
    if (!day4Done) {
      sealMsg.textContent = "Primero completa el Día 4 ✅ y luego sellamos el final.";
      return;
    }
    state.final.sealed = true;
    saveState(state);
    sealMsg.textContent = "Sellado ✅. Has terminado tu Ruta del Agua. Tu “soy capaz” ya es historia.";
  });

  resetBtn.addEventListener("click", () => {
    const ok = confirm("¿Reiniciar el progreso? (No se puede deshacer)");
    if (!ok) return;
    localStorage.removeItem(STORAGE_KEY);
    state = loadState();
    renderAll();
  });
}

let eventsWired = false;
function renderAll() {
  renderFormLink();
  renderMissionList();
  renderMissionPanel();
  renderProgress();
  if (!eventsWired) {
    wireEvents();
    eventsWired = true;
  }
}
renderAll();
