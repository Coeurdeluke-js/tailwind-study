module.exports = {
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
      },
      animation: {
        slideInRight: 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}