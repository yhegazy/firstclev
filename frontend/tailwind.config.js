module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      display: ['hover', 'focus', 'group-hover']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["pastel", "forest", "luxury"],
  },
}
