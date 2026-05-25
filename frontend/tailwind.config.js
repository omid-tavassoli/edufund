/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0d0d0d',
          secondary: '#161616',
          card: '#1e1e1e',
          input: '#252525',
        },
        accent: {
          primary: '#3b82f6',
          secondary: '#60a5fa',
        },
      },
    },
  },
  plugins: [],
}
