/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Teal-Strong': '#4BA2AC',
        'Teal-Medium': '#50C9BA',
        'Teal-Light': '#9EE6CF',
        'Beige': '#F0EEC9'

      }
    },
  },
  plugins: [],
}