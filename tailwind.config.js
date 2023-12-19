const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./backend/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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

        genshin: {
          brown: "hsl(var(--genshin-brown))",
          blue: "hsl(var(--genshin-blue))",
          "brown-active": "hsl(var(--genshin-brown-active))",
          "blue-active": "hsl(var(--genshin-blue-active))",
          "brown-foreground-active":
            "hsl(var(--genshin-brown-foreground-active))",
          "blue-foreground-active":
            "hsl(var(--genshin-blue-foreground-active))",
        },

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

        section: {
          DEFAULT: "hsl(var(--section))",
          foreground: "hsl(var(--section-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        sheet: {
          DEFAULT: "hsl(var(--sheet))",
          border: "hsl(var(--sheet-border))",
          "btn-border": {
            DEFAULT: "hsl(var(--sheet-btn-border))",
            selected: "hsl(var(--sheet-btn-border-selected))",
          },
        },

        border: "hsl(var(--border))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          "foreground-active": "hsl(var(--primary-foreground-active))",
          active: "hsl(var(--primary-active))",
          outline: "hsl(var(--primary-outline))",
          hover: "hsl(var(--primary-hover))",
          ring: "hsl(var(--primary-ring))",
          "ring-active": "hsl(var(--primary-ring-active))",
        },

        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          "foreground-active": "hsl(var(--secondary-foreground-active))",
          active: "hsl(var(--secondary-active))",
          outline: "hsl(var(--secondary-outline))",
          hover: "hsl(var(--secondary-hover))",
          ring: "hsl(var(--secondary-ring))",
          "ring-active": "hsl(var(--secondary-ring-active))",
        },

        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        ring: {
          DEFAULT: "hsl(var(--ring))",
          white: "hsl(var(--ring-white))",
          "white-active": "hsl(var(--ring-white-active))",
          yellow: "hsl(var(--ring-yellow))",
          "yellow-active": "hsl(var(--ring-yellow-active))",
        },
      },
      ringWidth: {
        3: "3px",
      },
      ringOffsetWidth: {
        3: "3px",
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
