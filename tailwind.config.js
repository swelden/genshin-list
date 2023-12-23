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
        "2xl": "1444px",
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
        },

        icon: {
          green: "hsl(var(--icon-green))",
          red: "hsl(var(--icon-red))",
        },

        btn: {
          brown: {
            DEFAULT: "hsl(var(--btn-brown))",
            foreground: "hsl(var(--btn-brown-foreground))",
            outline: "hsl(var(--btn-brown-outline))",
            hover: "hsl(var(--btn-brown-hover))",
            ring: "hsl(var(--btn-brown-ring))",
            active: {
              DEFAULT: "hsl(var(--btn-brown-active))",
              foreground: "hsl(var(--btn-brown-active-foreground))",
              ring: "hsl(var(--btn-brown-active-ring))",
            },
          },
          blue: {
            DEFAULT: "hsl(var(--btn-blue))",
            foreground: "hsl(var(--btn-blue-foreground))",
            outline: "hsl(var(--btn-blue-outline))",
            hover: "hsl(var(--btn-blue-hover))",
            ring: "hsl(var(--btn-blue-ring))",
            active: {
              DEFAULT: "hsl(var(--btn-blue-active))",
              foreground: "hsl(var(--btn-blue-active-foreground))",
              ring: "hsl(var(--btn-blue-active-ring))",
            },
          },
          dark: {
            DEFAULT: "hsl(var(--btn-dark))",
            foreground: "hsl(var(--btn-dark-foreground))",
            hover: "hsl(var(--btn-dark-hover))",
            active: {
              DEFAULT: "hsl(var(--btn-dark-active))",
              foreground: "hsl(var(--btn-dark-active-foreground))",
            },
          },
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

        ring: "hsl(var(--ring))",
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
