/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#F672D1',
      'primary-light': '#FBBEEA',
      'default': '#000000',
      'default-light': '#E2E2E2',
      'light': '#AAAAAA',
      'alert-success': '#d1f4e0',
      'alert-danger': '#fdd0df',
      'brown': '#F2EEF0'
    },


    extend: {
      colors: {
        'text-default': '#E2E2E2', 
      },
      boxShadow: {
        'DEFAULT': '0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1)'
      },

      fontSize: {
        'title': ['2.25rem', {
          lineHeight: '2.5rem',
          fontWeight: '700'
        }],
        'heading': ['1.5rem', {
          lineHeight: '2rem',
          fontWeight: '700'
        }]
      },
  
    },
  },
  plugins: [],
}

