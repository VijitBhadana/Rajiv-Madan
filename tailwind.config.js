/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // Dark mode is a "dark" class on <html> (set by index.html + ThemeToggle)
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#071322",
          900: "#0b1a2e",
          800: "#112640",
          700: "#1a3352",
          600: "#26476d",
        },
        brand: {
          50: "#ecfdf8",
          100: "#d1faef",
          200: "#a7f3df",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0f9488",
          700: "#0f766e",
        },
        // Gold accent from the logo
        gold: {
          400: "#d6b062",
          500: "#b98f3e",
        },
        surface: "#f6f8f9",
      },
      fontFamily: {
        serif: ['"DM Serif Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Urbanist"', "system-ui", "sans-serif"],
      },
      keyframes: {
        caret: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(64px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-64px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        caret: "caret 1s step-end infinite",
        "slide-in-right": "slide-in-right 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "slide-in-left": "slide-in-left 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 26, 46, 0.04), 0 4px 16px rgba(15, 26, 46, 0.05)",
        panel: "0 20px 50px -12px rgba(11, 26, 46, 0.18)",
      },
    },
  },
  plugins: [],
};
