const regions = {
  France: {
    Bordeaux: {
      "Haut-Medoc": {
        "Alter Ego de Palmer": {},
        "Chateau Pichon": {},
        "Chateau Margaux": {},
        "Chateau Palmer": {},
        "Chateau Latour": {},
      },
      Medoc: {},
      "Pessac-Leognan": {},
      Graves: {},
      Sauternes: {},
      "Bordeaux Superieur & Bordeaux AC": {},
      "Arcachon Bay": {},
      "Cotes de Bourg & Cotes de Blaye": {},
      Pomerol: {},
      Fronsac: {},
      "Saint-Emilion": {},
      "Entre-Deux-Mers": {},
    },
    Bourgogne: {
      "Gevrey-Chambertin": {
        "Clos Saint-Jacques": {},
      },
    },
    Champagne: {},
    "Loire-dalen": {},
    "Rhone-dalen": {},
    Alsace: {},
    Provence: {},
    "Languedoc-Roussillon": {},
    "Sud-Ouest": {},
    Beaujolais: {},
    Jura: {},
    Savoie: {},
    Bugey: {},
  },
  Italy: {
    Tuscany: {
      Chianti: {
        "Castello di Ama": {},
      },
    },
    Piedmont: {
      Barolo: {
        Cannubi: {},
      },
    },
  },
  Spain: {
    Rioja: {
      "Rioja Alta": {
        "Vina Ardanza": {},
      },
    },
  },
  USA: {
    California: {
      Napa: {
        Oakville: {},
      },
    },
  },
  Argentina: {
    Mendoza: {
      Lujan: {
        "Las Compuertas": {},
      },
    },
  },
  Chile: {
    Maipo: {
      "Alto Maipo": {
        "Puente Alto": {},
      },
    },
  },
  "South Africa": {
    Stellenbosch: {
      Helderberg: {
        "Rust en Vrede": {},
      },
    },
  },
  Australia: {
    "South Australia": {
      Barossa: {
        "Ebenezer": {},
      },
    },
  },
  "New Zealand": {
    Marlborough: {
      Wairau: {
        "Cloudy Bay": {},
      },
    },
  },
};

const wines = [
  {
    name: "Alter Ego de Palmer 2022",
    year: 2022,
    primaryGrape: "Cabernet Sauvignon",
    grapes: ["Cabernet Sauvignon", "Merlot", "Petit Verdot"],
    path: ["France", "Bordeaux", "Haut-Medoc", "Alter Ego de Palmer"],
  },
  {
    name: "Castello di Ama 2019",
    year: 2019,
    primaryGrape: "Sangiovese",
    grapes: ["Sangiovese", "Merlot", "Cabernet Sauvignon"],
    path: ["Italy", "Tuscany", "Chianti", "Castello di Ama"],
  },
  {
    name: "Vina Ardanza Reserva 2015",
    year: 2015,
    primaryGrape: "Tempranillo",
    grapes: ["Tempranillo", "Garnacha"],
    path: ["Spain", "Rioja", "Rioja Alta", "Vina Ardanza"],
  },
  {
    name: "Cloudy Bay Sauvignon Blanc",
    year: 2020,
    primaryGrape: "Sauvignon Blanc",
    grapes: ["Sauvignon Blanc"],
    path: ["New Zealand", "Marlborough", "Wairau", "Cloudy Bay"],
  },
  {
    name: "Rust en Vrede 2018",
    year: 2018,
    primaryGrape: "Cabernet Sauvignon",
    grapes: ["Cabernet Sauvignon", "Shiraz", "Merlot"],
    path: ["South Africa", "Stellenbosch", "Helderberg", "Rust en Vrede"],
  },
];

const state = {
  wine: null,
  step: 0,
  zoom: 1,
  score: 0,
  phase: "location",
  yearStep: 0,
  yearSpan: 5,
  lastYearGuess: 2003,
  answers: {
    location: [],
    year: [],
    grape: [],
    locationSkipped: false,
    yearSkipped: false,
    grapeSkipped: false,
  },
};

const wineInput = document.getElementById("wineInput");
const startBtn = document.getElementById("startBtn");
const wineHelp = document.getElementById("wineHelp");
const sampleList = document.getElementById("sampleList");
const winePanel = document.getElementById("winePanel");
const locationPanel = document.getElementById("locationPanel");
const locationDoneHint = document.getElementById("locationDoneHint");
const mapEl = document.getElementById("map");
const mapInner = document.getElementById("mapInner");
const optionsEl = document.getElementById("options");
const yearPanel = document.getElementById("yearPanel");
const yearHint = document.getElementById("yearHint");
const yearInput = document.getElementById("yearInput");
const yearSubmit = document.getElementById("yearSubmit");
const yearHelp = document.getElementById("yearHelp");
const yearDoneHint = document.getElementById("yearDoneHint");
const yearMin = document.getElementById("yearMin");
const yearMax = document.getElementById("yearMax");
const yearSelected = document.getElementById("yearSelected");
const yearBubble = document.getElementById("yearBubble");
const yearRange = document.getElementById("yearRange");
const grapePanel = document.getElementById("grapePanel");
const grapeOptions = document.getElementById("grapeOptions");
const grapeHelp = document.getElementById("grapeHelp");
const grapeDoneHint = document.getElementById("grapeDoneHint");
const statusEl = document.getElementById("status");
const statusText = document.getElementById("statusText");
const scoreText = document.getElementById("scoreText");
const stepHint = document.getElementById("stepHint");
const nextBtn = document.getElementById("nextBtn");
const resetBtn = document.getElementById("resetBtn");
const mapControls = document.getElementById("mapControls");
const zoomOutBtn = document.getElementById("zoomOut");
const zoomInBtn = document.getElementById("zoomIn");
const zoomLabel = document.getElementById("zoomLabel");
const debugToggle = document.getElementById("debugToggle");
const debugPanel = document.getElementById("debugPanel");
const debugOutput = document.getElementById("debugOutput");
const finalPanel = document.getElementById("finalPanel");
const finalText = document.getElementById("finalText");

const countryOrder = Object.keys(regions);
const franceMapRegions = [
  "Bordeaux",
  "Bourgogne",
  "Champagne",
  "Loire-dalen",
  "Rhone-dalen",
  "Alsace",
  "Provence",
  "Languedoc-Roussillon",
  "Sud-Ouest",
  "Beaujolais",
];

const bordeauxMapRegions = [
  "Haut-Medoc",
  "Medoc",
  "Pessac-Leognan",
  "Graves",
  "Sauternes",
  "Bordeaux Superieur & Bordeaux AC",
  "Arcachon Bay",
  "Cotes de Bourg & Cotes de Blaye",
  "Pomerol",
  "Fronsac",
  "Saint-Emilion",
  "Entre-Deux-Mers",
];

const grapePoolsByCountry = {
  France: [
    "Cabernet Sauvignon",
    "Merlot",
    "Cabernet Franc",
    "Petit Verdot",
    "Syrah",
    "Grenache",
    "Chardonnay",
    "Sauvignon Blanc",
  ],
  Italy: [
    "Sangiovese",
    "Nebbiolo",
    "Barbera",
    "Montepulciano",
    "Cabernet Sauvignon",
    "Merlot",
  ],
  Spain: [
    "Tempranillo",
    "Garnacha",
    "Monastrell",
    "Carinena",
    "Graciano",
  ],
  "New Zealand": ["Sauvignon Blanc", "Pinot Noir", "Chardonnay", "Riesling"],
  "South Africa": ["Cabernet Sauvignon", "Shiraz", "Pinotage", "Merlot", "Chenin Blanc"],
  USA: ["Cabernet Sauvignon", "Merlot", "Pinot Noir", "Chardonnay", "Zinfandel"],
  Argentina: ["Malbec", "Cabernet Sauvignon", "Bonarda"],
  Chile: ["Carmenere", "Cabernet Sauvignon", "Merlot"],
  Australia: ["Shiraz", "Cabernet Sauvignon", "Chardonnay"],
  Germany: ["Riesling", "Spatburgunder", "Silvaner"],
};

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

const setStatus = (message, tone = "") => {
  statusText.textContent = message;
  statusEl.classList.remove("success", "error");
  if (tone) {
    statusEl.classList.add(tone);
  }
};

const updateScore = () => {
  scoreText.textContent = `Score: ${state.score}`;
};

const playTone = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = type === "success" ? 660 : 220;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    osc.stop(ctx.currentTime + 0.2);
  } catch (error) {
    // Ignore audio failures (e.g., autoplay restrictions)
  }
};

const setActivePanels = ({ wine, location, year, grape, final }) => {
  winePanel.classList.toggle("hidden", !wine);
  locationPanel.classList.toggle("hidden", !location);
  yearPanel.classList.toggle("hidden", !year);
  grapePanel.classList.toggle("hidden", !grape);
  finalPanel.classList.toggle("hidden", !final);
};

const renderLocationAnswers = () => {
  const items = state.answers.location.map((entry) => {
    const klass = entry.correct ? "answer-correct" : "answer-wrong";
    return `<span class="${klass}">${entry.value}</span>`;
  });
  if (state.answers.locationSkipped) {
    items.push('<span class="answer-skip">Sprang over</span>');
  }
  if (items.length === 0) {
    return '<span class="answer-skip">Sprang over</span>';
  }
  return items.join(" > ");
};

const renderYearAnswers = () => {
  const items = state.answers.year.map((entry) => {
    const klass = entry.correct ? "answer-correct" : "answer-wrong";
    return `<span class="${klass}">${entry.value}</span>`;
  });
  if (state.answers.yearSkipped) {
    items.push('<span class="answer-skip">Sprang over</span>');
  }
  if (items.length === 0) {
    return '<span class="answer-skip">Sprang over</span>';
  }
  return items.join(", ");
};

const renderGrapeAnswers = () => {
  const items = state.answers.grape.map((entry) => {
    const klass = entry.correct ? "answer-correct" : "answer-wrong";
    return `<span class="${klass}">${entry.value}</span>`;
  });
  if (state.answers.grapeSkipped) {
    items.push('<span class="answer-skip">Sprang over</span>');
  }
  if (items.length === 0) {
    return '<span class="answer-skip">Sprang over</span>';
  }
  return items.join(", ");
};

const showFinal = () => {
  const locationAnswer = renderLocationAnswers();
  const yearAnswer = renderYearAnswers();
  const grapeAnswer = renderGrapeAnswers();
  finalText.innerHTML = [
    `Godt gaaet, du fik ${state.score} point.`,
    `Sted: ${locationAnswer}`,
    `Aargang: ${yearAnswer}`,
    `Primaer drue: ${grapeAnswer}`,
  ].join("<br />");
  setActivePanels({ wine: false, location: false, year: false, grape: false, final: true });
};

const setMapType = (type) => {
  mapInner.classList.remove("world", "france", "bordeaux");
  mapInner.classList.add(type);
};

let selectedHotspot = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };

const formatPercent = (value) => `${value.toFixed(2)}%`;

const getHotspotData = (el) => {
  const rect = mapInner.getBoundingClientRect();
  const item = el.getBoundingClientRect();
  const left = ((item.left - rect.left) / rect.width) * 100;
  const top = ((item.top - rect.top) / rect.height) * 100;
  const width = (item.width / rect.width) * 100;
  const height = (item.height / rect.height) * 100;
  return { left, top, width, height };
};

const applyHotspotData = (el, data) => {
  el.style.left = formatPercent(data.left);
  el.style.top = formatPercent(data.top);
  el.style.width = formatPercent(data.width);
  el.style.height = formatPercent(data.height);
};

const updateDebugOutput = () => {
  if (!selectedHotspot) {
    debugOutput.textContent = "Vaelg en boks for at se koordinater.";
    return;
  }
  const data = getHotspotData(selectedHotspot);
  const label = selectedHotspot.getAttribute("aria-label") || "label";
  const slugLabel = slug(label);
  debugOutput.textContent = [
    `${label}`,
    `left: ${formatPercent(data.left)}; top: ${formatPercent(data.top)};`,
    `width: ${formatPercent(data.width)}; height: ${formatPercent(data.height)};`,
    `.map-inner.${mapInner.classList.contains("bordeaux") ? "bordeaux" : "france"} .${slugLabel} {`,
    `  left: ${formatPercent(data.left)};`,
    `  top: ${formatPercent(data.top)};`,
    `  width: ${formatPercent(data.width)};`,
    `  height: ${formatPercent(data.height)};`,
    `}`,
  ].join("\n");
};

const shuffle = (items) => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const buildGrapeOptions = () => {
  if (!state.wine) return [];
  const primary = state.wine.primaryGrape;
  const options = [primary];
  state.wine.grapes
    .filter((grape) => grape !== primary)
    .forEach((grape) => {
      if (options.length < 6) options.push(grape);
    });
  const pool = grapePoolsByCountry[state.wine.path[0]] || [];
  const candidates = shuffle(pool.filter((grape) => !options.includes(grape)));
  for (const grape of candidates) {
    if (options.length >= 6) break;
    options.push(grape);
  }
  return shuffle(options);
};

const renderGrapeOptions = () => {
  grapeOptions.innerHTML = "";
  const options = buildGrapeOptions();
  options.forEach((grape) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = grape;
    btn.addEventListener("click", () => handleGrapeSelection(grape));
    grapeOptions.appendChild(btn);
  });
};

const resetGame = () => {
  state.wine = null;
  state.step = 0;
  state.zoom = 1;
  state.score = 0;
  state.phase = "location";
  state.yearStep = 0;
  state.answers = {
    location: [],
    year: [],
    grape: [],
    locationSkipped: false,
    yearSkipped: false,
    grapeSkipped: false,
  };
  state.lastYearGuess = 2003;
  state.lastYearGuess = 2003;
  wineInput.value = "";
  wineHelp.textContent = "";
  yearInput.value = "";
  yearHelp.textContent = "";
  setActivePanels({ wine: true, location: false, year: false, grape: false, final: false });
  locationPanel.classList.remove("minimized");
  locationDoneHint.classList.add("hidden");
  yearPanel.classList.remove("minimized");
  yearDoneHint.classList.add("hidden");
  grapePanel.classList.remove("minimized");
  grapeHelp.textContent = "";
  grapeDoneHint.classList.add("hidden");
  finalText.textContent = "";
  setStatus("Venter paa vin.");
  updateScore();
  stepHint.textContent = "Start med landet paa verdenskortet.";
  optionsEl.innerHTML = "";
  mapEl.classList.add("hidden");
  mapControls.classList.add("hidden");
  optionsEl.classList.add("hidden");
  yearPanel.classList.add("hidden");
  resetBtn.classList.add("hidden");
  nextBtn.classList.add("hidden");
  updateZoom();
  setMapType("world");
  renderMapItems(countryOrder);
};

const renderSamples = () => {
  sampleList.innerHTML = "";
  wines.forEach((wine) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "sample";
    const alias = wine.name === "Alter Ego de Palmer 2022" ? "Allers Vin" : null;
    chip.textContent = alias || wine.name;
    chip.addEventListener("click", () => {
      wineInput.value = alias || wine.name;
      wineInput.focus();
    });
    sampleList.appendChild(chip);
  });
};

const renderMapItems = (items, { showLabels = true } = {}) => {
  mapInner.innerHTML = "";
  items.forEach((label) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = `tile ${slug(label)}`;
    if (showLabels) {
      tile.textContent = label;
    } else {
      tile.classList.add("hotspot");
      tile.setAttribute("aria-label", label);
      tile.setAttribute("title", label);
      tile.dataset.label = label;
      tile.textContent = "";
    }
    tile.addEventListener("click", () => handleSelection(label));
    mapInner.appendChild(tile);
  });
};

const updateZoom = () => {
  mapInner.style.transform = `scale(${state.zoom})`;
  zoomLabel.textContent = `${Math.round(state.zoom * 100)}%`;
};

const getNodeAtPath = (path) => {
  let node = regions;
  for (const key of path) {
    if (!node[key]) return null;
    node = node[key];
  }
  return node;
};

const renderOptions = () => {
  optionsEl.innerHTML = "";
  const pathSoFar = state.wine.path.slice(0, state.step);
  const node = getNodeAtPath(pathSoFar);
  if (!node) return;

  Object.keys(node).forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.textContent = option;
    btn.addEventListener("click", () => handleSelection(option));
    optionsEl.appendChild(btn);
  });
};

const updateYearBubble = () => {
  const min = Number(yearInput.min);
  const max = Number(yearInput.max);
  const value = Number(yearInput.value);
  const percent = max === min ? 50 : ((value - min) / (max - min)) * 100;
  const span = state.yearSpan;
  const low = Math.max(min, value - span);
  const high = Math.min(max, value + span);
  const lowPct = max === min ? 0 : ((low - min) / (max - min)) * 100;
  const highPct = max === min ? 100 : ((high - min) / (max - min)) * 100;
  yearBubble.style.left = `${percent}%`;
  yearBubble.textContent = value;
  yearSelected.textContent = `Valgt: ${value}`;
  yearRange.textContent = `Interval: ${low} - ${high}`;
  yearInput.style.background = `linear-gradient(90deg, rgba(26, 20, 17, 0.2) 0%, rgba(26, 20, 17, 0.2) ${lowPct}%, rgba(122, 29, 43, 0.35) ${lowPct}%, rgba(122, 29, 43, 0.35) ${highPct}%, rgba(26, 20, 17, 0.2) ${highPct}%, rgba(26, 20, 17, 0.2) 100%)`;
};

const renderStep = () => {
  if (!state.wine) {
    resetGame();
    return;
  }

  if (state.phase === "year") {
    locationPanel.classList.add("minimized");
    locationDoneHint.textContent = "2. Vaelg sted er faerdig.";
    locationDoneHint.classList.remove("hidden");
    mapEl.classList.add("hidden");
    mapControls.classList.add("hidden");
    optionsEl.classList.add("hidden");
    setActivePanels({ wine: false, location: false, year: true, grape: false, final: false });
    yearPanel.classList.remove("minimized");
    yearDoneHint.classList.add("hidden");
    grapePanel.classList.remove("minimized");
    grapeDoneHint.classList.add("hidden");
    const ranges = [10, 5, 3, 0];
    const range = ranges[state.yearStep] ?? 0;
    yearHint.textContent =
      range === 0
        ? "Gaet det praecise aarstal."
        : `Gaet inden for ${range} aar.`;
    const minYear = 1980;
    const maxYear = 2026;
    state.yearSpan = range === 0 ? 0 : Math.round(range / 2);
    yearInput.min = String(minYear);
    yearInput.max = String(maxYear);
    yearInput.value = String(state.lastYearGuess);
    yearMin.textContent = String(minYear);
    yearMax.textContent = String(maxYear);
    updateYearBubble();
    setStatus("Gaet aargang.");
    resetBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    updateDebugOutput();
    return;
  }

  setActivePanels({ wine: false, location: true, year: false, grape: false, final: false });
  locationPanel.classList.remove("minimized");
  locationDoneHint.classList.add("hidden");
  grapePanel.classList.remove("minimized");
  grapeDoneHint.classList.add("hidden");

  if (state.phase === "grape") {
    locationPanel.classList.add("minimized");
    locationDoneHint.textContent = "2. Vaelg sted er faerdig.";
    locationDoneHint.classList.remove("hidden");
    mapEl.classList.add("hidden");
    mapControls.classList.add("hidden");
    optionsEl.classList.add("hidden");
    setActivePanels({ wine: false, location: false, year: false, grape: true, final: false });
    grapePanel.classList.remove("minimized");
    grapeDoneHint.classList.add("hidden");
    grapeHelp.textContent = "";
    renderGrapeOptions();
    setStatus("Gaet primaer drue.");
    resetBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
    updateDebugOutput();
    finalPanel.classList.add("hidden");
    return;
  }

  grapePanel.classList.add("hidden");

  if (state.step === 0) {
    stepHint.textContent = "Klik paa landet paa verdenskortet.";
    setMapType("world");
    renderMapItems(countryOrder);
    mapEl.classList.remove("hidden");
    mapControls.classList.remove("hidden");
    optionsEl.classList.add("hidden");
  } else if (state.step === 1 && state.wine.path[0] === "France") {
    stepHint.textContent = "Vaelg det korrekte franske omraade.";
    setMapType("france");
    renderMapItems(franceMapRegions, { showLabels: false });
    mapEl.classList.remove("hidden");
    mapControls.classList.remove("hidden");
    optionsEl.classList.add("hidden");
  } else if (
    state.step === 2 &&
    state.wine.path[0] === "France" &&
    state.wine.path[1] === "Bordeaux"
  ) {
    stepHint.textContent = "Vaelg det korrekte Bordeaux-omraade.";
    setMapType("bordeaux");
    renderMapItems(bordeauxMapRegions, { showLabels: false });
    mapEl.classList.remove("hidden");
    mapControls.classList.remove("hidden");
    optionsEl.classList.add("hidden");
  } else {
    const labels = ["land", "omraade", "subomraade", "mark"];
    const label = labels[state.step] || "sted";
    stepHint.textContent = `Vaelg korrekt ${label}.`;
    mapEl.classList.add("hidden");
    mapControls.classList.add("hidden");
    optionsEl.classList.remove("hidden");
    renderOptions();
  }

  setStatus("Gaet vinens oprindelse.");
  resetBtn.classList.remove("hidden");
  nextBtn.classList.remove("hidden");
  updateDebugOutput();
};

const skipStep = () => {
  if (!state.wine) return;
  if (state.phase === "location") {
    state.step = state.wine.path.length;
    state.phase = "year";
    state.yearStep = 0;
    state.answers.locationSkipped = true;
    state.answers.location = [];
    setStatus("Springer til aargang.");
    renderStep();
    return;
  }
  if (state.phase === "year") {
    state.phase = "grape";
    state.answers.yearSkipped = true;
    state.answers.year = [];
    setStatus("Springer til drue.");
    renderStep();
    return;
  }
  setStatus("Springer videre - faerdig.");
  stepHint.textContent = "Fuldfort - nulstil for at proeve en ny vin.";
  grapePanel.classList.remove("hidden");
  grapePanel.classList.add("minimized");
  grapeDoneHint.textContent = "4. Primaer drue er faerdig.";
  grapeDoneHint.classList.remove("hidden");
  state.answers.grapeSkipped = true;
  showFinal();
};

const handleGrapeSelection = (selection) => {
  if (!state.wine) return;
  if (selection !== state.wine.primaryGrape) {
    state.score -= 1;
    updateScore();
    state.answers.grape.push({ value: selection, correct: false });
    setStatus("Forkert drue - proev igen.", "error");
    playTone("error");
    return;
  }
  state.score += 3;
  updateScore();
  playTone("success");
  setStatus("Korrekt drue!", "success");
  grapePanel.classList.add("minimized");
  grapeDoneHint.textContent = "4. Primaer drue er faerdig.";
  grapeDoneHint.classList.remove("hidden");
  state.answers.grape.push({ value: selection, correct: true });
  showFinal();
};

const handleSelection = (selection) => {
  if (!state.wine) return;
  const expected = state.wine.path[state.step];

  if (selection !== expected) {
    state.score -= 1;
    updateScore();
    state.answers.location.push({ value: selection, correct: false });
    setStatus("Forkert valg - proev igen.", "error");
    playTone("error");
    return;
  }

  state.step += 1;
  state.score += 3;
  updateScore();
  state.answers.location.push({ value: selection, correct: true });
  playTone("success");

  if (state.step >= state.wine.path.length) {
    setStatus("Korrekt - videre til aargang!", "success");
    stepHint.textContent = "Gaet aargang.";
    state.phase = "year";
    state.yearStep = 0;
    renderStep();
    return;
  }

  setStatus("Korrekt - videre!", "success");
  renderStep();
};

const findWine = (input) => {
  const normalized = input.trim().toLowerCase();
  if (normalized === "allers vin") {
    return wines.find((wine) => wine.name === "Alter Ego de Palmer 2022") || null;
  }
  return wines.find((wine) => wine.name.toLowerCase() === normalized) || null;
};

startBtn.addEventListener("click", () => {
  const selected = findWine(wineInput.value);
  if (!selected) {
    wineHelp.textContent = "Fandt ikke vinen. Proev en af eksemplerne herunder.";
    setStatus("Venter paa korrekt vin.");
    return;
  }
  wineHelp.textContent = "";
  state.wine = selected;
  state.step = 0;
  state.phase = "location";
  state.yearStep = 0;
  setActivePanels({ wine: false, location: true, year: false, grape: false, final: false });
  state.answers = {
    location: [],
    year: [],
    grape: [],
    locationSkipped: false,
    yearSkipped: false,
    grapeSkipped: false,
  };
  winePanel.classList.add("hidden");
  setStatus("Vin valgt - find landet.");
  renderStep();
});

resetBtn.addEventListener("click", resetGame);
nextBtn.addEventListener("click", skipStep);
yearInput.addEventListener("input", () => {
  updateYearBubble();
});

yearSubmit.addEventListener("click", () => {
  if (!state.wine) return;
  const yearValue = Number(yearInput.value);
  if (!Number.isFinite(yearValue)) {
    yearHelp.textContent = "Skriv et gyldigt aarstal.";
    return;
  }
  yearHelp.textContent = "";
  const ranges = [10, 5, 3, 0];
  const range = ranges[state.yearStep] ?? 0;
  const diff = Math.abs(yearValue - state.wine.year);
  const allowed = range === 0 ? 0 : state.yearSpan;
  const correct = range === 0 ? diff === 0 : diff <= allowed;
  if (!correct) {
    state.score -= 1;
    updateScore();
    if (range === 0) {
      state.answers.year.push({ value: `praecist: ${yearValue}`, correct: false });
    } else {
      state.answers.year.push({ value: `inden for ${range}: ${yearValue}`, correct: false });
    }
    setStatus("Forkert - proev igen.", "error");
    playTone("error");
    return;
  }
  state.score += 3;
  updateScore();
  playTone("success");
  state.lastYearGuess = yearValue;
  if (range === 0) {
    state.answers.year.push({ value: `praecist: ${yearValue}`, correct: true });
  } else {
    state.answers.year.push({ value: `inden for ${range}: ${yearValue}`, correct: true });
  }
  state.yearStep += 1;
  if (state.yearStep >= ranges.length) {
    setStatus("Korrekt! Du ramte aargangen.", "success");
    stepHint.textContent = "Fuldfort - nulstil for at proeve en ny vin.";
    state.phase = "grape";
    renderStep();
    return;
  }
  yearInput.value = "";
  setStatus("Korrekt - videre!", "success");
  renderStep();
});
zoomOutBtn.addEventListener("click", () => {
  state.zoom = Math.max(1, +(state.zoom - 0.1).toFixed(2));
  updateZoom();
});
zoomInBtn.addEventListener("click", () => {
  state.zoom = Math.min(2, +(state.zoom + 0.1).toFixed(2));
  updateZoom();
});
debugToggle.addEventListener("click", () => {
  mapInner.classList.toggle("debug");
  debugPanel.classList.toggle("hidden", !mapInner.classList.contains("debug"));
  updateDebugOutput();
});

mapInner.addEventListener("click", (event) => {
  if (!mapInner.classList.contains("debug")) return;
  const target = event.target.closest(".hotspot");
  if (!target) return;
  if (selectedHotspot) selectedHotspot.classList.remove("selected");
  selectedHotspot = target;
  selectedHotspot.classList.add("selected");
  updateDebugOutput();
});

mapInner.addEventListener("pointerdown", (event) => {
  if (!mapInner.classList.contains("debug")) return;
  const target = event.target.closest(".hotspot");
  if (!target) return;
  event.preventDefault();
  if (selectedHotspot && selectedHotspot !== target) {
    selectedHotspot.classList.remove("selected");
  }
  selectedHotspot = target;
  selectedHotspot.classList.add("selected");
  const rect = target.getBoundingClientRect();
  dragOffset = { x: event.clientX - rect.left, y: event.clientY - rect.top };
  isDragging = true;
  target.setPointerCapture(event.pointerId);
});

mapInner.addEventListener("pointermove", (event) => {
  if (!isDragging || !selectedHotspot) return;
  const rect = mapInner.getBoundingClientRect();
  const width = selectedHotspot.getBoundingClientRect().width;
  const height = selectedHotspot.getBoundingClientRect().height;
  const leftPx = event.clientX - rect.left - dragOffset.x;
  const topPx = event.clientY - rect.top - dragOffset.y;
  const data = {
    left: (leftPx / rect.width) * 100,
    top: (topPx / rect.height) * 100,
    width: (width / rect.width) * 100,
    height: (height / rect.height) * 100,
  };
  applyHotspotData(selectedHotspot, data);
  updateDebugOutput();
});

mapInner.addEventListener("pointerup", (event) => {
  if (!isDragging) return;
  isDragging = false;
  if (selectedHotspot) selectedHotspot.releasePointerCapture(event.pointerId);
});

document.addEventListener("keydown", (event) => {
  if (!mapInner.classList.contains("debug") || !selectedHotspot) return;
  const step = event.shiftKey ? 1 : 0.5;
  const sizeStep = event.shiftKey ? 0.5 : 0;
  const data = getHotspotData(selectedHotspot);
  let changed = false;

  switch (event.key) {
    case "ArrowUp":
      if (event.shiftKey) {
        data.height = Math.max(1, data.height - sizeStep);
      } else {
        data.top = data.top - step;
      }
      changed = true;
      break;
    case "ArrowDown":
      if (event.shiftKey) {
        data.height = data.height + sizeStep;
      } else {
        data.top = data.top + step;
      }
      changed = true;
      break;
    case "ArrowLeft":
      if (event.shiftKey) {
        data.width = Math.max(1, data.width - sizeStep);
      } else {
        data.left = data.left - step;
      }
      changed = true;
      break;
    case "ArrowRight":
      if (event.shiftKey) {
        data.width = data.width + sizeStep;
      } else {
        data.left = data.left + step;
      }
      changed = true;
      break;
    default:
      break;
  }

  if (changed) {
    event.preventDefault();
    applyHotspotData(selectedHotspot, data);
    updateDebugOutput();
  }
});

renderSamples();
mapInner.classList.add("debug");
debugPanel.classList.remove("hidden");
resetGame();
