const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "3rem",
        lg: "4rem",
      },
    },
    extend: {
      // TODO: consolidate colors
      colors: {
        gold: {
          400: "#FFD780",
          500: "#F0A400",
        },
        pyro: "#FF9999",
        hydro: "#80C0FF",
        dendro: "#B2EA2A",
        electro: "#FFACFF",
        anemo: "#80FFD7",
        cryo: "#99FFFF",
        geo: "#FFE699",

        ui: "#ECE5D8",
        "ui-outline": "#83829D", // for circle buttons
        "ui-contrast": "#495366", // also sort-bg
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
      },
      fontFamily: {
        sans: ["HYWenHei-85W", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
