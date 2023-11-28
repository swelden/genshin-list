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
      padding: "2rem",
      screens: {
        "2xl": "1600px",
      },
    },
    extend: {
      colors: {
        gold: "hsl(var(--gold))",
        pyro: "hsl(var(--pyro))",
        hydro: "hsl(var(--hydro))",
        dendro: "hsl(var(--dendro))",
        electro: "hsl(var(--electro))",
        anemo: "hsl(var(--anemo))",
        cryo: "hsl(var(--cryo))",
        geo: "hsl(var(--geo))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        item: {
          DEFAULT: "hsl(var(--item))",
          foreground: "hsl(var(--item-foreground))",
        },

        select: {
          DEFAULT: "hsl(var(--select))",
          foreground: "hsl(var(--select-foreground))",
          hover: "hsl(var(--select-hover))",
          active: "hsl(var(--select-active))",
          "active-foreground": "hsl(var(--select-active-foreground))",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          active: "hsl(var(--primary-active))",
          outline: "hsl(var(--primary-outline))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        ring: "hsl(var(--ring))",
      },
      gridTemplateColumns: {
        14: "repeat(14, minmax(0, 1fr))",
      },
      fontFamily: {
        genshin: ["var(--font-genshin)"],
      },
      cursor: {
        genshin: "url(/images/genshin-cursor.png), auto",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@headlessui/tailwindcss"),
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
  ],
};
