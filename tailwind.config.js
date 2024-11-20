/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        christmas: ["'Black And White Picture'", "system-ui"],
      },
    },
  },
  plugins: [],
};
