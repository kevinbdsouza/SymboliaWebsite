/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: '#FF5A1F', // warm orange for accent lines (used by DynamicNetworkBackground)
        ink: '#0C1E2C',    // deep navy ink
        primary: '#A0522D', // Example: Sienna - a darker, brownish-red. Choose your desired color for "Symbolic AI".
        heading: '#616161',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
