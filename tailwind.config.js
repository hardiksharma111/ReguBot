/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "rgb(var(--base) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        brand: "rgb(var(--brand) / <alpha-value>)",
        brand2: "rgb(var(--brand-2) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)"
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Space Grotesk", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(19, 38, 71, 0.35)",
        soft: "0 12px 40px rgba(14, 25, 44, 0.18)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(90, 120, 255, 0.35), transparent 60%)",
        "hero-linear": "linear-gradient(135deg, rgba(33, 76, 255, 0.65), rgba(0, 214, 195, 0.55))",
        "grid-light": "linear-gradient(transparent 39px, rgba(0,0,0,0.06) 40px), linear-gradient(90deg, transparent 39px, rgba(0,0,0,0.06) 40px)",
        "grid-dark": "linear-gradient(transparent 39px, rgba(255,255,255,0.06) 40px), linear-gradient(90deg, transparent 39px, rgba(255,255,255,0.06) 40px)"
      }
    }
  },
  plugins: []
};
