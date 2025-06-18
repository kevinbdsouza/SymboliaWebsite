/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      maxWidth: { // Add the maxWidth key here
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        accent: '#FF5A1F', // warm orange for accent lines (used by DynamicNetworkBackground)
        'accent-faded': 'rgba(255, 90, 31, 0.6)',
        ink: '#0C1E2C',    // deep navy ink
        primary: '#A0522D', // Example: Sienna - a darker, brownish-red. Choose your desired color for "Symbolic AI".
        heading: '#616161',
      },
      // Add this typography key to configure the 'prose' class
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.sans').join(', '),
            'h1, h2, h3, h4, h5, h6': {
              fontFamily: theme('fontFamily.serif').join(', '),
              fontWeight: theme('fontWeight.medium'), // reduces boldness from bold to semibold
            },
          },
        },
        lg: {
            css: {
                h4: {
                    fontSize: theme('fontSize.xl'),
                },
            },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Add this line
  ],
}
