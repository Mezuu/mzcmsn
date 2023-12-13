/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cmsn-black': '#070707',
        'cmsn-white': '#EFEFEF',
        'cmsn-turquoise': '#34d1bf',
        'cmsn-cerise': '#D1345B',
        'cmsn-gray': '#a1a1aa',
        'cmsn-black-lighter': '#272a2b'
      }
    },
  },
  plugins: [],
}

