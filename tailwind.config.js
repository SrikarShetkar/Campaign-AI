/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        rose: {
          primary: '#A96A80',
          hover: '#945A70',
          secondary: '#EBC8D0',
          accent: '#D89AAA',
          highlight: '#F8D9DF',
        },
        bg: {
          main: '#FFF8F8',
          section: '#F8E8EB',
          card: '#FFFFFF',
          alt: '#F3D8DE',
          light: '#FFF8F8',
          dark: '#FFF8F8',
        },
        text: {
          primary: '#4A2E38',
          secondary: '#7D6670',
          muted: '#A08A92',
          white: '#FFFFFF',
        },
        ui: {
          border: '#EDD5DB',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'Manrope', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
      },
      boxShadow: {
        'soft': '0 8px 24px rgba(169, 106, 128, 0.12)',
        'soft-lg': '0 12px 36px rgba(169, 106, 128, 0.16)',
        'soft-sm': '0 4px 12px rgba(169, 106, 128, 0.08)',
        'glow-rose': '0 0 25px rgba(169, 106, 128, 0.25)',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(135deg, #FFF8F8 0%, #F8E8EB 45%, #EBC8D0 100%)',
        'rose-gradient': 'linear-gradient(90deg, #A96A80 0%, #D89AAA 100%)',
        'card-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FFF8F8 100%)',
      }
    },
  },
  plugins: [],
}
