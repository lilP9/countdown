/*
  Personalize here:
  - TARGET_DATE: countdown end date. JavaScript months are 0-based, so July is 6.
  - LAUNCH_DATE: the day the daily picture sequence starts.
  - moments: one hero image + caption + hidden note per day.

  Preview helpers:
  - Add ?preview=final to the URL to preview July 15.
  - Add ?preview=2026-07-05 to preview a specific date.
*/

const TARGET_DATE = new Date(2026, 6, 15); // July 15, 2026
const LAUNCH_DATE = new Date(2026, 5, 27); // June 27, 2026
const DAY_MS = 24 * 60 * 60 * 1000;

const moments = [
  {
    src: "assets/images/day-01.jpg",
    caption: "Close to you",
    position: "center 44%",
    accent: "#d1846d",
    note: "Some photos feel like a whole sentence without needing a single word. This is one of them."
  },
  {
    src: "assets/images/day-02.jpg",
    caption: "Picnic light",
    position: "center center",
    accent: "#d79b62",
    note: "I love the easy kind of happiness in this one. Sunlight, grass, and you near me."
  },
  {
    src: "assets/images/day-03.jpg",
    caption: "The grass day",
    position: "center 45%",
    accent: "#cc856a",
    note: "This looks like time slowed down for a second. I wish I could keep moments like this in my pocket."
  },
  {
    src: "assets/images/day-04.jpg",
    caption: "Soft window morning",
    position: "center 44%",
    accent: "#c77c66",
    note: "A quiet moment, a soft light, and the kind of peace I only really feel when I am close to you."
  },
  {
    src: "assets/images/day-05.jpg",
    caption: "The safest hug",
    position: "center 38%",
    accent: "#c57462",
    note: "You look so happy here. I want to be the reason for that look as often as I can."
  },
  {
    src: "assets/images/day-06.jpg",
    caption: "Sleepy calm",
    position: "center 42%",
    accent: "#a98772",
    note: "Even the sleepy, ordinary moments with you feel like something I want to remember."
  },
  {
    src: "assets/images/day-07.jpg",
    caption: "That look",
    position: "center 40%",
    accent: "#c36f5d",
    note: "There are pictures that make me smile immediately. This is definitely one of them."
  },
  {
    src: "assets/images/day-08.jpg",
    caption: "Home kind of peace",
    position: "center 38%",
    accent: "#c56c58",
    note: "Home is not really a place in this picture. It is the feeling next to you."
  },
  {
    src: "assets/images/day-09.jpg",
    caption: "Café face",
    position: "center 34%",
    accent: "#ce7c5d",
    note: "Even when you make that face, you are still my favorite view."
  },
  {
    src: "assets/images/day-10.jpg",
    caption: "Board game queen",
    position: "center 39%",
    accent: "#d49a54",
    note: "You make simple evenings feel like little adventures. I would choose the seat across from you every time."
  },
  {
    src: "assets/images/day-11.jpg",
    caption: "Our fox moment",
    position: "center 50%",
    accent: "#c58451",
    note: "Random little memories somehow become ours. I love that we can turn almost anything into an inside joke."
  },
  {
    src: "assets/images/day-12.jpg",
    caption: "Dubai chocolate mission",
    position: "center 52%",
    accent: "#c9994c",
    note: "Tiny snacks, tiny missions, tiny stories. I love building a whole little world out of small things with you."
  },
  {
    src: "assets/images/day-13.jpg",
    caption: "Tiny sunshine",
    position: "center 38%",
    accent: "#9f8a68",
    note: "Soft moments like this remind me how gentle life can feel around the right people."
  },
  {
    src: "assets/images/day-14.jpg",
    caption: "Tiny smiles",
    position: "center 38%",
    accent: "#d88b86",
    note: "This smile is one of those things I never really get used to."
  },
  {
    src: "assets/images/day-15.jpg",
    caption: "Silly us",
    position: "center 39%",
    accent: "#cf855f",
    note: "I hope we never lose the silly side of us. It is honestly one of my favorite parts."
  },
  {
    src: "assets/images/day-16.jpg",
    caption: "Helmet era",
    position: "center 42%",
    accent: "#708fb6",
    note: "For the official record: yes, this one belongs in the countdown too."
  },
  {
    src: "assets/images/day-17.jpg",
    caption: "Almost there",
    position: "center 38%",
    accent: "#b78c72",
    note: "One day closer. One sleepy little reminder that I miss being near you."
  },
  {
    src: "assets/images/day-18.jpg",
    caption: "For you, officially",
    position: "center 44%",
    accent: "#d05b57",
    note: "I made this for you because I love you, I choose you, and July 15 cannot come fast enough."
  }
];

const finalNote = {
  title: "Today is July 15",
  text: "The countdown is over, but this little love project was never only about counting days. It was about keeping a piece of us close every morning, every night, and every ordinary moment in between. I love you."
};

const el = {
  body: document.body,
  heroPhoto: document.getElementById("heroPhoto"),
  heroImage: document.getElementById("heroImage"),
  daysNumber: document.getElementById("daysNumber"),
  daysLabel: document.getElementById("daysLabel"),
  dateLine: document.getElementById("dateLine"),
  photoCaption: document.getElementById("photoCaption"),
  photoCount: document.getElementById("photoCount"),
  progressBar: document.getElementById("progressBar"),
  daysButton: document.getElementById("daysButton"),
  letterButton: document.getElementById("letterButton"),
  soundButton: document.getElementById("soundButton"),
  finalLetterButton: document.getElementById("finalLetterButton"),
  finalReveal: document.getElementById("finalReveal"),
  memoryGrid: document.getElementById("memoryGrid"),
  confetti: document.getElementById("confetti"),
  modal: document.getElementById("noteModal"),
  noteKicker: document.getElementById("noteKicker"),
  noteTitle: document.getElementById("noteTitle"),
  noteText: document.getElementById("noteText")
};

let audioEnabled = true;
let galleryBuilt = false;
let confettiShown = false;

function previewDateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const preview = params.get("preview");
  if (!preview) return null;
  if (preview.toLowerCase() === "final") return new Date(2026, 6, 15);
  const match = preview.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function nowDate() {
  return previewDateFromUrl() || new Date();
}

function dateOnlyValue(date = new Date()) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function calendarDaysBetween(from, to) {
  return Math.round((dateOnlyValue(to) - dateOnlyValue(from)) / DAY_MS);
}

function daysRemaining(now = nowDate()) {
  return Math.max(calendarDaysBetween(now, TARGET_DATE), 0);
}

function totalCountdownDays() {
  return Math.max(calendarDaysBetween(LAUNCH_DATE, TARGET_DATE), 1);
}

function isFinalDay(now = nowDate()) {
  return calendarDaysBetween(now, TARGET_DATE) <= 0;
}

function activeMomentIndex(now = nowDate()) {
  const totalDays = totalCountdownDays();
  const remaining = daysRemaining(now);
  const passed = Math.max(0, totalDays - remaining);
  return Math.min(passed, moments.length - 1);
}

function render() {
  const now = nowDate();
  const final = isFinalDay(now);
  const remaining = daysRemaining(now);
  const index = activeMomentIndex(now);
  const moment = moments[index];
  const momentNumber = index + 1;

  document.documentElement.style.setProperty("--hero-image", `url("${moment.src}")`);
  document.documentElement.style.setProperty("--hero-position", moment.position || "center center");
  if (el.heroImage) {
    if (!el.heroImage.src.endsWith(moment.src)) el.heroImage.src = moment.src;
    el.heroImage.alt = moment.caption || "Today’s memory";
    el.heroImage.style.objectPosition = moment.position || "center center";
  }
  const accent = moment.accent || "#d1846d";
  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--accent-deep", shade(accent, -27));
  document.documentElement.style.setProperty("--accent-rgb", hexToRgb(accent));

  el.body.classList.toggle("is-final", final);
  el.finalReveal.setAttribute("aria-hidden", final ? "false" : "true");

  if (final) {
    el.daysNumber.textContent = "♡";
    el.daysLabel.textContent = "is here";
    el.dateLine.textContent = "July 15";
    el.photoCaption.textContent = "Every day led here";
    el.photoCount.textContent = `${moments.length} little memories unlocked`;
    el.progressBar.style.width = "100%";
    el.letterButton.textContent = "read the final letter";
    buildGallery();
    if (!confettiShown) {
      confettiShown = true;
      setTimeout(popConfetti, 350);
    }
  } else {
    el.daysNumber.textContent = remaining;
    el.daysLabel.textContent = remaining === 1 ? "day" : "days";
    el.dateLine.textContent = "until July 15";
    el.photoCaption.textContent = moment.caption;
    el.photoCount.textContent = `day ${momentNumber} / ${moments.length}`;
    const progress = Math.max(3, Math.round((momentNumber / moments.length) * 100));
    el.progressBar.style.width = `${progress}%`;
    el.letterButton.textContent = "open today’s note";
  }

  preloadNext(index);
}

function openNote() {
  gentleChime();
  if (isFinalDay()) {
    el.noteKicker.textContent = "the day is here";
    el.noteTitle.textContent = finalNote.title;
    el.noteText.textContent = finalNote.text;
    popConfetti();
  } else {
    const index = activeMomentIndex();
    const moment = moments[index];
    el.noteKicker.textContent = "today’s note";
    el.noteTitle.textContent = moment.caption;
    el.noteText.textContent = moment.note;
  }
  el.modal.classList.add("is-open");
  el.modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeNote() {
  el.modal.classList.remove("is-open");
  el.modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function buildGallery() {
  if (galleryBuilt) return;
  galleryBuilt = true;
  moments.slice(1).forEach((moment) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.loading = "lazy";
    img.src = moment.src;
    img.alt = moment.caption;
    const caption = document.createElement("figcaption");
    caption.textContent = moment.caption;
    figure.append(img, caption);
    el.memoryGrid.append(figure);
  });
}

function preloadNext(currentIndex) {
  const next = moments[Math.min(currentIndex + 1, moments.length - 1)];
  const img = new Image();
  img.src = next.src;
}

function scheduleMidnightRefresh() {
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 3);
  window.setTimeout(() => {
    render();
    scheduleMidnightRefresh();
  }, Math.max(1000, nextMidnight - now));
}

function gentleChime() {
  if (!audioEnabled) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.72);
    gain.connect(ctx.destination);

    [523.25, 659.25, 783.99].forEach((frequency, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime + i * 0.07);
      osc.connect(gain);
      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + 0.72);
    });
    setTimeout(() => ctx.close(), 900);
  } catch (error) {
    // Sound is optional. Ignore browser audio restrictions.
  }
}

function popConfetti() {
  if (!el.confetti) return;
  el.confetti.replaceChildren();
  const colors = ["var(--accent)", "#fff2e8", "#f4b39b", "#c76d5a", "#f8d7c8"];
  for (let i = 0; i < 42; i++) {
    const piece = document.createElement("span");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.setProperty("--drift", `${(Math.random() * 180) - 90}px`);
    piece.style.setProperty("--speed", `${2.4 + Math.random() * 1.4}s`);
    piece.style.animationDelay = `${Math.random() * 0.45}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    el.confetti.append(piece);
  }
  window.setTimeout(() => el.confetti.replaceChildren(), 4600);
}

function shade(hex, percent) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
  const number = parseInt(full, 16);
  const amount = Math.round(2.55 * percent);
  const r = Math.max(0, Math.min(255, (number >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((number >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (number & 0x0000ff) + amount));
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean;
  const number = parseInt(full, 16);
  const r = (number >> 16) & 255;
  const g = (number >> 8) & 255;
  const b = number & 255;
  return `${r}, ${g}, ${b}`;
}

el.daysButton.addEventListener("click", openNote);
el.letterButton.addEventListener("click", openNote);
el.finalLetterButton.addEventListener("click", openNote);
el.soundButton.addEventListener("click", () => {
  audioEnabled = !audioEnabled;
  el.soundButton.classList.toggle("is-muted", !audioEnabled);
  el.soundButton.textContent = audioEnabled ? "♪" : "×";
  if (audioEnabled) gentleChime();
});
el.modal.addEventListener("click", (event) => {
  if (event.target.matches("[data-close]")) closeNote();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNote();
});
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render();
});

render();
scheduleMidnightRefresh();
