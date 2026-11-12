const storageKey = "dresden-bulls-bingo:v1";
const languageKey = "dresden-bulls-bingo:language";
const tiles = Array.from(document.querySelectorAll(".tile"));
const progress = document.querySelector("#progress");
const status = document.querySelector("#status");
const reset = document.querySelector("#reset");
const resetDialog = document.querySelector("#reset-dialog");
const printButton = document.querySelector("#print");
const validIds = new Set(tiles.map((tile) => tile.dataset.scene));
const winningLines = [
  [0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19], [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23], [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24], [4, 8, 12, 16, 20],
];
const bingoSubtitles = {
  de: [
    "Der Auftakt ist geschafft!",
    "Du legst nach!",
    "Jetzt kommt Tempo auf!",
    "Das Ziel ist in Sicht!",
    "Stark gepaddelt!",
    "Halbzeit auf dem Wasser!",
    "Du hältst den Takt!",
    "Weiter mit Rückenwind!",
    "Jetzt geht’s in den Endspurt!",
    "Zweistellig. Stark!",
    "Eine Linie fehlt noch!",
    "Volle Karte. Stark bis zum Schluss!",
  ],
  en: [
    "You’re off to a strong start!",
    "You’ve done it again!",
    "Now you’re picking up speed!",
    "The finish is in sight!",
    "Strong paddling!",
    "You’re halfway there!",
    "You’ve found your rhythm!",
    "Keep that momentum going!",
    "You’re on the home stretch!",
    "Double digits. Well done!",
    "One line to go!",
    "Full card. What a finish!",
  ],
};
const completed = readCompleted();
let language = "de";
let previousBingoCount = 0;
let celebration;

function readCompleted() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return new Set(Array.isArray(saved) ? saved.filter((id) => validIds.has(id)) : []);
  } catch {
    return new Set();
  }
}

function render(celebrate = false) {
  const completedLines = winningLines.filter((line) =>
    line.every((index) => completed.has(tiles[index].dataset.scene)),
  );
  const winningTiles = new Set(completedLines.flat());
  tiles.forEach((tile, index) => {
    const done = completed.has(tile.dataset.scene);
    const bingo = winningTiles.has(index);
    tile.setAttribute("aria-pressed", String(done));
    tile.classList.toggle("is-bingo", bingo);
  });

  progress.value = completed.size;
  reset.disabled = completed.size === 0;
  const score = document.createElement("strong");
  const english = language === "en";
  score.textContent = completed.size + (english ? " of " : " von ") + tiles.length;
  const bingo = completedLines.length === 1
    ? " · Bingo!"
    : completedLines.length > 1 ? " · " + completedLines.length + " Bingos!" : "";
  status.replaceChildren(score, (english ? " completed" : " erledigt") + bingo);
  const bingoCount = completedLines.length;
  if (celebrate && bingoCount > previousBingoCount) celebrateBingo(bingoCount);
  previousBingoCount = bingoCount;
}

function saveAndRender(celebrate = false) {
  try {
    localStorage.setItem(storageKey, JSON.stringify([...completed]));
  } catch {
    // Keep the current session playable when browser storage is unavailable.
  }
  render(celebrate);
}

tiles.forEach((tile) => {
  tile.addEventListener("click", () => {
    const id = tile.dataset.scene;
    const marked = !completed.delete(id);
    if (marked) completed.add(id);
    saveAndRender(marked);
  });
});

reset.addEventListener("click", () => {
  resetDialog.returnValue = "cancel";
  resetDialog.showModal();
});
resetDialog.addEventListener("close", () => {
  if (resetDialog.returnValue === "reset") {
    completed.clear();
    saveAndRender();
    tiles[0].focus();
  }
});
const artwork = Array.from(document.querySelectorAll(".tile-art img"));
function loadArtworkForPrint() {
  artwork.forEach((image) => { image.loading = "eager"; });
}
printButton.addEventListener("click", async () => {
  loadArtworkForPrint();
  await Promise.allSettled(artwork.map((image) => image.decode()));
  window.print();
});
window.addEventListener("beforeprint", loadArtworkForPrint);

const taskDetails = document.querySelector("#task-details");
const taskDetailsTitle = document.querySelector("#task-details-title");
const taskDetailsText = document.querySelector("#task-details-text");
const taskDetailsImages = taskDetails.querySelectorAll("img");
const closeTaskButton = document.querySelector("#close-task-details");
let activeInfo;

function clearTaskTrigger() {
  activeInfo?.setAttribute("aria-expanded", "false");
  activeInfo = undefined;
}

function closeTaskDetails() {
  clearTaskTrigger();
  if (typeof taskDetails.hidePopover === "function" && taskDetails.matches(":popover-open")) {
    taskDetails.hidePopover();
  }
}

function showTaskDetails(tile, info, title, task) {
  const anchor = tile.getBoundingClientRect();
  if (taskDetails.matches(":popover-open")) closeTaskDetails();

  activeInfo = info;
  info.setAttribute("aria-expanded", "true");
  taskDetailsTitle.textContent = title.textContent;
  taskDetailsText.textContent = task.textContent;
  const imageSource = tile.querySelector("img").src;
  taskDetailsImages.forEach((image) => { image.src = imageSource; });
  taskDetails.showPopover();

  const originX = anchor.left + anchor.width / 2;
  const originY = anchor.top + anchor.height / 2;
  taskDetails.style.setProperty("--from-x", originX - document.documentElement.clientWidth / 2 + "px");
  taskDetails.style.setProperty("--from-y", originY - window.innerHeight / 2 + "px");
  taskDetails.style.setProperty("--from-scale-x", anchor.width / taskDetails.offsetWidth);
  taskDetails.style.setProperty("--from-scale-y", anchor.height / taskDetails.offsetHeight);
  closeTaskButton.focus({ preventScroll: true });
}

closeTaskButton.addEventListener("click", () => {
  const trigger = activeInfo;
  closeTaskDetails();
  trigger?.focus({ preventScroll: true });
});
taskDetails.addEventListener("toggle", (event) => {
  if (event.newState === "closed" && !taskDetails.matches(":popover-open")) clearTaskTrigger();
});
window.addEventListener("resize", closeTaskDetails);
window.addEventListener("scroll", (event) => {
  if (event.target === window || !taskDetails.contains(event.target)) closeTaskDetails();
}, true);

function celebrateBingo(count) {
  celebration?.remove();
  celebration = document.querySelector("#celebration").content.firstElementChild.cloneNode(true);
  const overlay = celebration;
  const message = overlay.querySelector(".celebration-message");
  message.querySelector(".celebration-word").textContent = count === 1 ? "Bingo!" : count + " Bingo!";
  message.querySelector(".celebration-subtitle").textContent = bingoSubtitles[language][count - 1];
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const fireworks = overlay.querySelector(".fireworks");
    const bursts = [
      { x: 23, y: 38, delay: .1, color: "#88ffc1" },
      { x: 73, y: 28, delay: .34, color: "#ffd27c" },
      { x: 50, y: 51, delay: .57, color: "#e5ffab" },
      { x: 15, y: 68, delay: .79, color: "#7ce1ff" },
      { x: 84, y: 60, delay: 1.02, color: "#ff9bb5" },
    ];
    bursts.forEach(({ x, y, delay, color }) => {
      const burst = document.createElement("div");
      burst.className = "firework";
      burst.style.setProperty("--x", x + "%");
      burst.style.setProperty("--y", y + "%");
      burst.style.setProperty("--color", color);
      burst.style.setProperty("--delay", delay + "s");
      for (let index = 0; index < 32; index++) {
        const spark = document.createElement("span");
        spark.className = "spark";
        spark.style.setProperty("--angle", (index * 11.25 + Math.random() * 6) + "deg");
        spark.style.setProperty("--distance", (8 + Math.random() * 20) + "vmin");
        spark.style.setProperty("--length", (10 + Math.random() * 27) + "px");
        spark.style.setProperty("--duration", (.72 + Math.random() * .42) + "s");
        burst.append(spark);
      }
      fireworks.append(burst);
    });
  }
  message.addEventListener("animationend", () => {
    overlay.remove();
    if (celebration === overlay) celebration = undefined;
  }, { once: true });
  document.body.append(overlay);
}

const languagePicker = document.querySelector("#language");
const skyline = document.querySelector(".skyline");
const siteDescription = document.querySelector('meta[name="description"]');
const originalTitle = document.title;
const originalSkylineAlt = skyline.alt;
const originalDescription = siteDescription.content;
const localizedText = Object.entries(englishCopy.text).map(([selector, english]) => {
  const element = document.querySelector(selector);
  return { element, german: element.textContent, english };
});
const localizedLabels = Object.entries(englishCopy.ariaLabels).map(([selector, english]) => {
  const element = document.querySelector(selector);
  return { element, german: element.getAttribute("aria-label"), english };
});
const localizedScenes = tiles.map((tile) => {
  const title = tile.querySelector(".tile-copy strong");
  const task = tile.querySelector(".tile-copy span");
  const info = tile.parentElement.querySelector(".tile-info");
  if (typeof taskDetails.showPopover === "function") {
    info.hidden = false;
    info.addEventListener("click", () => showTaskDetails(tile, info, title, task));
  }
  return {
    title,
    task,
    info,
    german: [title.textContent, task.textContent],
    english: englishCopy.scenes[tile.dataset.scene],
  };
});

function applyLanguage(choice) {
  closeTaskDetails();
  language = choice;
  const english = language === "en";
  document.documentElement.lang = language;
  taskDetails.lang = language;
  document.title = english ? "Dragon Boat Bingo · Dresden Bulls" : originalTitle;
  skyline.alt = english
    ? "Dresden old town skyline with the Catholic Court Church and the Frauenkirche"
    : originalSkylineAlt;
  siteDescription.content = english
    ? "25 illustrated dragon boat tasks for the Dresden Bulls of Verein Kanusport Dresden."
    : originalDescription;
  localizedText.forEach((entry) => {
    entry.element.textContent = english ? entry.english : entry.german;
  });
  localizedLabels.forEach((entry) => {
    entry.element.setAttribute("aria-label", english ? entry.english : entry.german);
  });
  localizedScenes.forEach((scene) => {
    const [title, task] = english ? scene.english : scene.german;
    scene.title.textContent = title;
    scene.task.textContent = task;
    scene.info.setAttribute("aria-label", (english ? "Task: " : "Aufgabe: ") + title);
  });
  languagePicker.querySelector(`[value="${language}"]`).checked = true;
  render();
}

if (typeof taskDetails.showPopover === "function") {
  document.querySelector(".board").classList.add("has-task-details");
}

let savedLanguage;
try {
  savedLanguage = localStorage.getItem(languageKey);
} catch {
  // Keep German as the default when browser storage is unavailable.
}
applyLanguage(savedLanguage === "en" ? "en" : "de");
languagePicker.disabled = false;
languagePicker.addEventListener("change", (event) => {
  const choice = event.target.value;
  applyLanguage(choice);
  try {
    localStorage.setItem(languageKey, choice);
  } catch {
    // The active tab can still switch languages.
  }
});
