const THEME_KEY = "ng-theme";

function setTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeToggle(theme);
}

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) return stored;
  return "dark";
}

function updateThemeToggle(theme) {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  const icon = toggle.querySelector(".theme-icon");
  const label = toggle.querySelector(".theme-label");
  if (theme === "light") {
    icon.textContent = "☀︎";
    label.textContent = "Light mode";
  } else {
    icon.textContent = "☾";
    label.textContent = "Dark mode";
  }
}

function initTheme() {
  const preferred = getPreferredTheme();
  setTheme(preferred);
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }
}

function initNavToggle() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const menu = document.querySelector("[data-nav-menu]");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("open");
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
    })
  );
}

function initSmoothScroll() {
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initCarousel() {
  const carousel = document.getElementById("projectCarousel");
  if (!carousel) return;
  const items = Array.from(carousel.querySelectorAll(".carousel-item"));
  const indicators = Array.from(carousel.querySelectorAll(".carousel-indicators button"));
  const prev = carousel.querySelector(".carousel-control-prev");
  const next = carousel.querySelector(".carousel-control-next");
  let current = items.findIndex((i) => i.classList.contains("active"));
  if (current < 0) current = 0;

  function setActive(index) {
    const newIndex = (index + items.length) % items.length;
    items.forEach((item, i) => item.classList.toggle("active", i === newIndex));
    indicators.forEach((dot, i) => dot.classList.toggle("active", i === newIndex));
    current = newIndex;
  }

  prev?.addEventListener("click", () => setActive(current - 1));
  next?.addEventListener("click", () => setActive(current + 1));
  indicators.forEach((dot, i) => dot.addEventListener("click", () => setActive(i)));
}

function initSkills() {
  document.querySelectorAll(".skill").forEach((skill) => {
    skill.classList.add("visible");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  window.history.scrollRestoration = "manual";
  window.scrollTo({ top: 0, behavior: "auto" });
  initTheme();
  initNavToggle();
  initSmoothScroll();
  initCarousel();
  initSkills();
});
