/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink-10": "#EC4899",
        "custom-pink-20": "#c71870",
        orange: "",
      },
      letterSpacing: {
        "extra-wide": ".25em", // Custom value
      },
    },
  },
  plugins: [],
};
