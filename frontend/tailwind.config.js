/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: "#EC4899",
        orange: "",
      },
      letterSpacing: {
        "extra-wide": ".25em", // Custom value
      },
    },
  },
  plugins: [],
};
