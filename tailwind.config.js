/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        BarlowRegular: ["barlowregular"],
        BarlowXtraBold: ["barlowextrabold"],
        BarlowXtraBoldItalic: ["barlowextrabolditalic"],
      },
    },
  },
  plugins: [],
};
