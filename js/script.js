/* VoiceCampus — frontend prototype logic
   Data is stored in the browser's localStorage only. */

const STORAGE_KEY = "voicecampus_feedback_v1";
const THEME_KEY = "voicecampus_theme";
const MAX_CHARS = 900;

const categories = ["Academics", "Administration", "Infrastructure", "Student Welfare", "Technology", "Other"];
const statuses = ["Submitted", "Under Review", "In Progress", "Resolved"];
const statusColors = ["#7c6ff2", "#f59e0b", "#3b82f6", "#10b981"];

/* ---------- Icons (Lucide-style, 24px grid) ---------- */
const ICONS = {
  layout: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chart: '<path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  trend: '<path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  eyeoff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="m2 2 20 20"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>',
  wifi: '<path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  wave: '<path d="M4 14v-4M8 18V6M12 21V3M16 17V7M20 14v-4"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
};
const categoryIcons = { Academics: "book", Administration: "building", Infrastructure: "wrench", "Student Welfare": "heart", Technology: "wifi", Other: "more" };

function icon(name, size = 18, stroke = 1.75) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
}
function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon, Number(el.dataset.size) || 18);
  });
}

/* ---------- Data ---------- */
const HOUR = 3600000;
const seed = [
  { id: "VC-1042", title: "More study spaces during examination periods", category: "Infrastructure", location: "Main Library", message: "It would be helpful to extend access to additional quiet study areas during examination periods, especially in the evenings.", anonymous: true, name: "", status: "In Progress", date: Date.now() - 5 * HOUR },
  { id: "VC-1041", title: "Clearer communication about timetable changes", category: "Academics", location: "Academic Office", message: "A central place for timetable updates would help students avoid missing important changes.", anonymous: false, name: "Alex M.", status: "Under Review", date: Date.now() - 21 * HOUR },
  { id: "VC-1040", title: "Improve Wi-Fi coverage in student areas", category: "Technology", location: "Student Centre", message: "The connection is inconsistent in some shared student spaces. Better coverage would support research and online learning.", anonymous: true, name: "", status: "Submitted", date: Date.now() - 39 * HOUR },
  { id: "VC-1039", title: "More water points around campus", category: "Student Welfare", location: "Sports Area", message: "Additional drinking water points would make the campus more comfortable for students throughout the day.", anonymous: false, name: "M. Banda", status: "Resolved", date: Date.now() - 65 * HOUR },
];

function loadFeedback() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  } catch (e) { /* storage unavailable — fall back to seed data */ }
  return seed.map((x) => ({ ...x }));
}
let feedback = loadFeedback();
function saveFeedback() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(feedback)); } catch (e) { /* ignore */ }
}

/* ---------- Helpers ---------- */
const $ = (id) => document.getElementById(id);
const setText = (id, value) => { const el = $(id); if (el) el.textContent = value; };
const countBy = (key, val) => feedback.filter((x) => x[key] === val).length;
const sorted = () => [...feedback].sort((a, b) => b.date - a.date);

function escapeHTML(v = "") {
  return String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function statusClass(s) { return "status-" + String(s).toLowerCase().replaceAll(" ", "-"); }
function timeAgo(date) {
  const m = Math.floor((Date.now() - date) / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr${h === 1 ? "" : "s"} ago`;
  const d = Math.floor(h / 24);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}
function toast(msg, type = "success") {
  const box = $("toast"), txt = $("toastMessage"), ico = $("toastIcon");
  if (!box || !txt) return;
  txt.textContent = msg;
  box.classList.toggle("error", type === "error");
  if (ico) ico.innerHTML = icon(type === "error" ? "alert" : "check", 14, 2.5);
  box.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => box.classList.remove("show"), 2800);
}

/* ---------- Shared shell (brand, sidebar, topbar, theme) ---------- */
const NAV = [
  { key: "dashboard", href: "dashboard.html", label: "Overview", icon: "layout" },
  { key: "feedback", href: "feedback.html", label: "Feedback inbox", icon: "inbox" },
  { key: "submit", href: "submit.html", label: "Submit feedback", icon: "plus" },
  { key: "insights", href: "insights.html", label: "Insights", icon: "chart" },
];
const brandHTML = `<span class="brand-mark">${icon("wave", 20, 2.25)}</span><span class="brand-name">Voice<span>Campus</span></span>`;

function renderShell() {
  document.querySelectorAll("[data-brand]").forEach((el) => { el.innerHTML = brandHTML; });
  const page = document.body.dataset.page;

  const sb = $("sidebar");
  if (sb) {
    sb.innerHTML = `
      <a class="brand" href="index.html" aria-label="VoiceCampus home">${brandHTML}</a>
      <div class="sidebar-label">Workspace</div>
      <nav class="nav" aria-label="Main navigation">
        ${NAV.map((n) => `<a class="nav-link${n.key === page ? " active" : ""}" href="${n.href}"${n.key === page ? ' aria-current="page"' : ""}>${icon(n.icon, 19)}<span>${n.label}</span>${n.key === "feedback" ? '<span class="nav-count" id="navCount">0</span>' : ""}</a>`).join("")}
      </nav>
      <div class="sidebar-foot">
        <div class="help-card">
          <div class="help-ico">${icon("sparkles", 18)}</div>
          <strong>Your voice matters.</strong>
          <p>Every thoughtful contribution helps make campus life better.</p>
          <a href="submit.html">Share your thoughts ${icon("arrow", 14, 2)}</a>
        </div>
        <div class="profile">
          <div class="avatar" aria-hidden="true">VC</div>
          <div><strong>Campus community</strong><small>Student workspace</small></div>
        </div>
      </div>`;
  }

  const tb = $("topbar");
  if (tb) {
    tb.innerHTML = `
      <button class="icon-btn menu-btn" id="mobileMenu" aria-label="Open navigation" aria-controls="sidebar" aria-expanded="false">${icon("menu", 20)}</button>
      <nav class="breadcrumb" aria-label="Breadcrumb"><span>Workspace</span>${icon("chevron", 14)}<strong>${escapeHTML(tb.dataset.title || "")}</strong></nav>
      <div class="topbar-actions">
        <span class="badge-demo"><i class="dot"></i>Local demo</span>
        <button class="icon-btn" data-theme-toggle type="button"></button>
        <div class="avatar avatar-sm" aria-hidden="true">S</div>
      </div>`;
  }
}

function currentTheme() { return document.documentElement.dataset.theme === "dark" ? "dark" : "light"; }
function refreshThemeButtons() {
  const dark = currentTheme() === "dark";
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.innerHTML = icon(dark ? "sun" : "moon", 19);
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    btn.setAttribute("title", dark ? "Light theme" : "Dark theme");
  });
}
function setupTheme() {
  refreshThemeButtons();
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => btn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    refreshThemeButtons();
  }));
}

function setupNavigation() {
  const sidebar = $("sidebar"), scrim = $("scrim"), btn = $("mobileMenu");
  if (!sidebar || !btn) return;
  const set = (open) => {
    sidebar.classList.toggle("open", open);
    scrim?.classList.toggle("show", open);
    btn.setAttribute("aria-expanded", String(open));
  };
  btn.addEventListener("click", () => set(!sidebar.classList.contains("open")));
  scrim?.addEventListener("click", () => set(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
}

/* ---------- Renderers ---------- */
function renderStats() {
  const total = feedback.length;
  setText("statTotal", total);
  setText("statReview", countBy("status", "Under Review"));
  setText("statProgress", countBy("status", "In Progress"));
  setText("statResolved", countBy("status", "Resolved"));
  setText("navCount", total);
  setText("insightTotal", total);
  setText("insightAnon", feedback.filter((x) => x.anonymous).length);
  setText("insightRate", total ? Math.round((countBy("status", "Resolved") / total) * 100) + "%" : "0%");
}

function renderRecent() {
  const list = $("recentList");
  if (!list) return;
  const items = sorted().slice(0, 4);
  list.innerHTML = items.map((x) => `
    <div class="row-item">
      <div class="cat-ico">${icon(categoryIcons[x.category] || "more", 19)}</div>
      <div class="row-main"><strong>${escapeHTML(x.title)}</strong><small>${escapeHTML(x.category)} · ${timeAgo(x.date)}</small></div>
      <span class="pill ${statusClass(x.status)}">${escapeHTML(x.status)}</span>
    </div>`).join("") || '<div class="empty-inline">No feedback yet. Be the first to share an idea.</div>';
}

function categoryMeters(withIcons) {
  const counts = categories.map((c) => countBy("category", c));
  const max = Math.max(1, ...counts);
  return categories.map((c, i) => `
    <div>
      <div class="meter-top"><span>${withIcons ? icon(categoryIcons[c], 16) : ""}${c}</span><b>${counts[i]}</b></div>
      <div class="meter-track" role="img" aria-label="${c}: ${counts[i]}"><i style="width:${(counts[i] / max) * 100}%"></i></div>
    </div>`).join("");
}
function renderCategorySummary() {
  const el = $("categorySummary");
  if (el) el.innerHTML = categoryMeters(false);
}

function renderFeedback() {
  const list = $("feedbackList");
  if (!list) return;
  const q = ($("searchInput")?.value || "").trim().toLowerCase();
  const cat = $("categoryFilter")?.value || "all";
  const status = $("statusFilter")?.value || "all";
  const items = sorted().filter((x) =>
    (cat === "all" || x.category === cat) &&
    (status === "all" || x.status === status) &&
    `${x.title} ${x.message} ${x.location} ${x.category}`.toLowerCase().includes(q));

  setText("resultCount", `${items.length} submission${items.length === 1 ? "" : "s"}`);
  list.innerHTML = items.length ? items.map((x) => `
    <article class="post">
      <div class="post-top">
        <div class="cat-ico">${icon(categoryIcons[x.category] || "more", 19)}</div>
        <div class="row-main"><strong>${escapeHTML(x.title)}</strong><small>${escapeHTML(x.id)}</small></div>
        <span class="pill ${statusClass(x.status)}">${escapeHTML(x.status)}</span>
      </div>
      <p>${escapeHTML(x.message)}</p>
      <div class="post-foot">
        <div class="meta">
          <span class="tag">${escapeHTML(x.category)}</span>
          <span>${icon("pin", 14)}${escapeHTML(x.location || "Campus")}</span>
          <span>${x.anonymous ? icon("eyeoff", 14) + "Anonymous" : icon("users", 14) + escapeHTML(x.name || "Student")}</span>
          <span>${icon("clock", 14)}${timeAgo(x.date)}</span>
        </div>
        <label class="status-edit"><span>Status</span>
          <select class="control" data-status-id="${escapeHTML(x.id)}" aria-label="Update status for ${escapeHTML(x.title)}">
            ${statuses.map((s) => `<option${x.status === s ? " selected" : ""}>${s}</option>`).join("")}
          </select>
        </label>
      </div>
    </article>`).join("")
    : `<div class="empty"><div class="cat-ico">${icon("search", 24)}</div><strong>No matching feedback</strong>Try changing your search or filters.</div>`;
}

function renderInsights() {
  const chart = $("categoryChart");
  if (chart) chart.innerHTML = categoryMeters(true);

  const donut = $("statusDonut");
  if (donut) {
    const total = feedback.length;
    const counts = statuses.map((s) => countBy("status", s));
    if (total) {
      let acc = 0;
      const stops = counts.map((n, i) => {
        const start = (acc / total) * 100; acc += n;
        return `${statusColors[i]} ${start}% ${(acc / total) * 100}%`;
      });
      donut.style.background = `conic-gradient(${stops.join(",")})`;
    } else {
      donut.style.background = "var(--border)";
    }
    setText("donutTotal", total);
    const legend = $("statusLegend");
    if (legend) legend.innerHTML = statuses.map((s, i) => `<div class="legend-row"><i style="background:${statusColors[i]}"></i>${s}<b>${counts[i]}</b></div>`).join("");
  }

  const top = categories.map((c) => [c, countBy("category", c)]).sort((a, b) => b[1] - a[1])[0];
  setText("insightTop", feedback.length && top[1] ? top[0] : "—");
}

function renderAll() {
  renderStats(); renderRecent(); renderCategorySummary(); renderFeedback(); renderInsights();
}

/* ---------- Page behaviour ---------- */
function setupInbox() {
  ["searchInput", "categoryFilter", "statusFilter"].forEach((id) =>
    $(id)?.addEventListener(id === "searchInput" ? "input" : "change", renderFeedback));

  $("feedbackList")?.addEventListener("change", (e) => {
    const sel = e.target.closest("[data-status-id]");
    if (!sel) return;
    const item = feedback.find((x) => x.id === sel.dataset.statusId);
    if (!item) return;
    item.status = sel.value;
    saveFeedback();
    renderAll();
    toast("Feedback status updated");
  });
}

function setupForm() {
  const form = $("feedbackForm");
  if (!form) return;
  const msg = $("message"), anon = $("anonymous"), nameField = $("nameField"), nameInput = $("studentName");

  const resetUI = () => {
    nameField?.classList.add("hidden");
    setText("charCount", `0 / ${MAX_CHARS}`);
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
  };

  msg?.addEventListener("input", () => setText("charCount", `${msg.value.length} / ${MAX_CHARS}`));
  anon?.addEventListener("change", (e) => {
    nameField?.classList.toggle("hidden", e.target.checked);
    if (!e.target.checked) nameInput?.focus();
  });
  $("clearForm")?.addEventListener("click", () => { form.reset(); resetUI(); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = $("title").value.trim(), message = msg.value.trim(), category = $("category").value;
    const name = nameInput?.value.trim() || "";
    const isAnon = anon.checked;

    const invalid = [["title", !title], ["message", !message], ["category", !category], ["studentName", !isAnon && !name]]
      .filter(([, bad]) => bad).map(([id]) => $(id));
    form.querySelectorAll("[aria-invalid]").forEach((el) => el.removeAttribute("aria-invalid"));
    if (invalid.length) {
      invalid.forEach((el) => el.setAttribute("aria-invalid", "true"));
      invalid[0].focus();
      toast(!isAnon && !name && invalid.length === 1 ? "Please enter your name or submit anonymously" : "Please complete all required fields", "error");
      return;
    }

    feedback.unshift({
      id: "VC-" + Date.now().toString().slice(-6),
      title, category, message,
      location: $("location").value.trim(),
      anonymous: isAnon, name: isAnon ? "" : name,
      status: "Submitted", date: Date.now(),
    });
    saveFeedback();
    form.reset(); resetUI();
    form.querySelector('[type="submit"]')?.setAttribute("disabled", "");
    toast("Your feedback has been submitted");
    setTimeout(() => { window.location.href = "feedback.html"; }, 900);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderShell();
  hydrateIcons();
  setupTheme();
  setupNavigation();
  renderAll();
  setupInbox();
  setupForm();
});
