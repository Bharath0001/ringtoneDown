/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      animation: {
        
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-30%)" },
          "100%": { transform: "translateX(0)" }
        },
      },
    },
  },
  plugins: [],
  safelist: [
    "hidden", "block", "grid", "flex", "text-white", "bg-gray-900", "animate-marquee"
  ],
  mode: 'jit'
};
