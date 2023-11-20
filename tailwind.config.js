const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
};

module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  darkMode: "class",
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
        gold: withOpacityValue("--gold-rgb"),
        pyro: withOpacityValue("--pyro-rgb"),
        hydro: withOpacityValue("--hydro-rgb"),
        dendro: withOpacityValue("--dendro-rgb"),
        electro: withOpacityValue("--electro-rgb"),
        anemo: withOpacityValue("--anemo-rgb"),
        cryo: withOpacityValue("--cryo-rgb"),
        geo: withOpacityValue("--geo-rgb"),

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
        sans: ["HYWenHei-85W", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus-visible"]);
    }),
  ],
};
