/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      custom1: ["Custom-1", "sans-serif"],
    },
    extend: {
      colors: {
        bluePrimary: "#7573FF",
      },
    },
  },
  plugins: [],
};
