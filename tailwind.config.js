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
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        // sm: "3rem",
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

        "btn-brown": "#ECE5D8",
        "btn-brown-click": "#A89C96",
        "btn-outline": "#83829D", // for circle buttons
        "btn-navy": "#3B4255",

        "card-brown": "#E9E5DC",
        "card-navy": "#495366",

        // for sort hover bg
        "sort-light-brown": "#DBD3C2",
        "sort-light-navy": "#606979",

        "filter-bg": "#263240",
        "attr-bg": "#565F70",
        "attr-hover-bg": "#606A7D",
        "attr-text": "#ECE5D8",
        "attr-bg-click": "#FAFBFB",
        "attr-text-click": "#454F66",

        // NOTE: colors that share values
        // "btn-bg-brown": "#ECE5D8", // same as sort-text-brown
        // "btn-text-navy": "#3B4255",

        // "card-bg-brown": "#E9E5DC",
        // "card-text-navy": "#495366", // same as sort-bg-navy

        // "sort-bg-navy": "#495366", // same as card-text-navy
        // "sort-text-brown": "#ECE5D8", // same as btn-bg-brown
        // "sort-bg-hover-navy": "#606979",
        // "sort-bg-active-brown": "#ECE5D8", // same as btn-bg-brown
        // "sort-text-active-navy": "#495366", // same as sort-bg-navy
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
