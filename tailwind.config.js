/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        secondary: 'rgb(var(--secondary) / <alpha-value>)',
        tertiary: 'rgb(var(--tertiary) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      aspectRatio: {
        'v-photo': '3 / 4',
      },
      fontSize: {
        'xxs': ['0.66rem', {
          lineHeight: '0.66rem',
          letterSpacing: '-0.01em',
          fontWeight: '400',
        }]
      },
      padding: {
        '0.25': '0.0625rem',
      },
      keyframes: {
        loader: {
          '0%': {
            transform: 'scale(0)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0'
          }
        }
      },
      animation: {
        loader: 'loader 2s linear infinite',
      }
    },
  },
  plugins: [],
}

