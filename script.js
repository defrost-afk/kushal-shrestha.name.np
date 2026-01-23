/* Kushal Shrestha — Portfolio JS (tiny + accessible) */

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

const storageKey = "kushal_portfolio_theme";

function getPreferredTheme() {
  const stored = localStorage.getItem(storageKey);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(storageKey, theme);
  const label = theme === "light" ? "Switch to dark theme" : "Switch to light theme";
  const btn = $("#themeToggle");
  if (btn) btn.setAttribute("aria-label", label);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function setYear() {
  const el = $("#year");
  if (el) el.textContent = String(new Date().getFullYear());
}

function initMobileNav() {
  const btn = $("#menuToggle");
  const nav = $("#siteNav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    const open = document.body.classList.toggle("nav-open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Close when clicking a nav link
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
  });

  // Escape closes menu
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!document.body.classList.contains("nav-open")) return;
    document.body.classList.remove("nav-open");
    btn.setAttribute("aria-expanded", "false");
    btn.focus();
  });
}

function initReveal() {
  const nodes = $all("[data-reveal]");
  if (nodes.length === 0) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("shown");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  nodes.forEach((n) => io.observe(n));
}

function initSmoothScrollOffset() {
  // If user loads with a #hash, push content below sticky header a bit
  if (!location.hash) return;
  setTimeout(() => {
    const el = document.querySelector(location.hash);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 76;
    window.scrollTo({ top, behavior: "instant" });
  }, 0);
}

document.addEventListener("DOMContentLoaded", () => {
  setTheme(getPreferredTheme());
  setYear();
  initMobileNav();
  initReveal();
  initSmoothScrollOffset();

  const themeBtn = $("#themeToggle");
  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
});
