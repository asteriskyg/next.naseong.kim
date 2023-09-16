/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "twitch-dark": "#18181b",
        "twitch-purple": "#9146ff",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require("@tailwindcss/aspect-ratio"),
  ],
};
