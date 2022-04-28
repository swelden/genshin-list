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
        "ui-contrast": "#495366",
        "card-title": "#E9E5DC",
        "card-contrast": "#3B4255",
      },
    },
  },
  plugins: [],
};
