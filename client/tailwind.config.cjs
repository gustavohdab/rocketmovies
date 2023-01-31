/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "BACKGROUND_900": "#0D0C0F",
        "BACKGROUND_800": "#1C1B1E",
        "BACKGROUND_700": "#2B2A2D",
        "BACKGROUND_600": "#312E38",
        "BACKGROUND_500": "#3E3B47",

        "INPUT_500": "#262529",
        "BORDER_500": "#3D3C40",

        "WHITE": "#F4EDE8",
        "WHITE_100": "#E5E5E5",
        "PINK": "#FF859B",

        "GRAY_400": "#CAC4CF",
        "GRAY_300": "#999591",
        "GRAY_200": "#948F99",
        "GRAY_100": "#3D3C40",
      },
    },
  },
  plugins: [],
}