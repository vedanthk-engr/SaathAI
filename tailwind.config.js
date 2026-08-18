/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pagebg: '#F6F3EA',
        sidebar: '#1C1C1E',
        'sidebar-[#1C1C1E]': '#1C1C1E',
        cardyellow: '#F7D046',
        cardpink: '#F498B6',
        cardgreen: '#88B04B',
        cardblue: '#8BA3E8',
        accentpink: '#EC4899',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'app': '32px',
        'card': '24px',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
};
