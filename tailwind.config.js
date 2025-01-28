/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#27AE60", // 50% glossy green
        secondary: "#F39C12", // 30% glossy orange
      },
      fontFamily: {
        fredoka: ["Fredoka One", "cursive"],
        quicksand: ["Quicksand", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
