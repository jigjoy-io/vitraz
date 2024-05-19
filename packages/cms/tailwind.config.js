/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#F672D1',
      'primary-light': '#FBBEEA'
    },

    extend: {
      boxShadow: {
        'DEFAULT': '0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1)'
      },
    },
  },
  plugins: [],
}

