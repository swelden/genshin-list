/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        // sm: "2rem",
        lg: "4rem",
      },
    },
    extend: {
      colors: {
        gold: "hsl(var(--gold-rgb))",
        pyro: "hsl(var(--pyro-rgb))",
        hydro: "hsl(var(--hydro-rgb))",
        dendro: "hsl(var(--dendro-rgb))",
        electro: "hsl(var(--electro-rgb))",
        anemo: "hsl(var(--anemo-rgb))",
        cryo: "hsl(var(--cryo-rgb))",
        geo: "hsl(var(--geo-rgb))",

        "btn-brown": "#ECE5D8", // same as sort-text-brown, sort-bg-active-brown
        "btn-brown-click": "#A89C96",
        "btn-outline": "#83829D", // for circle buttons
        "btn-navy": "#3B4255",

        "card-brown": "#E9E5DC",
        "card-navy": "#495366", // same as sort-bg-navy, sort-text-active-navy

        // for sort hover bg
        "sort-light-brown": "#DBD3C2",
        "sort-light-navy": "#606979",
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
      },
      fontFamily: {
        genshin: ["var(--font-genshin)"],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
  ],
};
