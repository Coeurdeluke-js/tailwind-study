/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: '#121212',
          light: '#fafafa',
          sith: '#ec4d58',
          'sith-dark': '#c43a46',
          'sith-light': '#ff6b75'
        },
        fontFamily: {
          'body': ['Inter', 'ui-sans-serif', 'system-ui'],
          'sans': ['Inter', 'ui-sans-serif', 'system-ui']
        },
        height: {
          'card': 'min-h-[600px]'
        }
      },
    },
    plugins: [],
  }