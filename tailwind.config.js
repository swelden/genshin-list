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

        // TODO: consolidate colors
        ui: "#ECE5D8",
        "ui-outline": "#83829D", // for circle buttons
        "ui-contrast": "#495366", // also sort-bg
        "ui-button-text": "#3B4255",
        "ui-bg-click": "#A89C96",
        "card-title": "#E9E5DC",
        "card-contrast": "#3B4255",
        "sort-text": "#ECE5D8",
        "sort-hover-bg": "#606979",
        "sort-hover-text": "#EBE4D8",
        "filter-bg": "#263240",
        "attr-bg": "#565F70",
        "attr-hover-bg": "#606A7D",
        "attr-text": "#ECE5D8",
        "attr-bg-click": "#FAFBFB",
        "attr-text-click": "#454F66",

        // NOTE: new colors
        // "btn-bg-brown": "",
        // "btn-text-navy": "",

        // "card-bg-brown": "",
        // "card-text-navy": "", // same as sort-bg-navy

        // "sort-bg-navy": "",
        // "sort-text-brown": "", // same as btn-bg-brown
        // "sort-bg-hover-navy": "",
        // "sort-bg-active-brown": "", // same as btn-bg-brown
        // "sort-text-active-navy": "", // same as sort-bg-navy
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
