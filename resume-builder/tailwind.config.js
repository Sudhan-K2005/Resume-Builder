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
        glass: "rgba(255, 255, 255, 0.1)",
        "glass-dark": "rgba(0, 0, 0, 0.2)",
      },
      backgroundImage: {
        "gradient-premium": "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
