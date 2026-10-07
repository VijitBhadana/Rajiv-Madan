import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";

// Saved choice; without one the site follows the device's light / dark setting.
// index.html applies the same rule before the first paint, so there is no flash.
const STORAGE_KEY = "theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked (private mode, disabled cookies)
  }
}

function store(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Nothing to do - the choice just won't survive a reload
  }
}

// Switch the class without every `transition` element animating its colours
// at its own speed (some run for 500ms+), which looks like a ripple.
function applyTheme(theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  // Force a style flush, then let transitions back on
  void root.offsetHeight;
  requestAnimationFrame(() => root.classList.remove("theme-switching"));
}

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Follow the device setting until the visitor picks a theme themselves
  useEffect(() => {
    const list = window.matchMedia(DARK_QUERY);
    const onChange = (e) => {
      if (!readStored()) setTheme(e.matches ? "dark" : "light");
    };
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    store(next);
    setTheme(next);
  };

  return { theme, toggle };
}

export default function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-navy-900 ring-1 ring-slate-200 transition hover:bg-slate-200 dark:bg-white/5 dark:text-gold-400 dark:ring-white/10 dark:hover:bg-white/10 sm:h-11 sm:w-11",
        className
      )}
    >
      <Sun
        aria-hidden="true"
        data-keep-transition
        className={`absolute h-5 w-5 transition duration-500 ${
          dark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />
      <Moon
        aria-hidden="true"
        data-keep-transition
        className={`absolute h-5 w-5 transition duration-500 ${
          dark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />
    </button>
  );
}
