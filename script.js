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

function initAnimations() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
          if (entry.target.classList.contains("skill")) {
            entry.target.classList.add("visible");
          }
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavToggle();
  initSmoothScroll();
  initAnimations();
});
