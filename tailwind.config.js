/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    color: {
      mode: 'traditional',
      primary: 'rgba(var(--primary), 1)',
      secondary: 'rgba(var(--secondary), 1)',
    },
    extend: {},
  },
  plugins: [],
}
