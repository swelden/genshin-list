module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "3rem",
        lg: "8rem",
      },
    },
    extend: {
      colors: {
        rare4: "#796BAC", // purple
        rare5: "#B27C3C", // gold
        colab: "#A14556", // red
        ui: "#ECE5D8",
        "ui-contrast": "#495366", // also sort-bg
        "ui-bg-click": "#A89C96",
        "card-title": "#E9E5DC",
        "card-contrast": "#3B4255",
        "sort-text": "#ECE5D8",
        "sort-hover-bg": "#606979",
        "sort-hover-text": "#EBE4D8",
        "filter-bg": "#263240",
      },
    },
  },
  plugins: [],
};
