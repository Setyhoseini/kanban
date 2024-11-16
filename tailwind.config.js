/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {

    screens: {
      'sm': '0px',
      'md': '742px',
      // => @media (min-width: 768px) { ... }
    },

    extend: {

      boxShadow: {
        'sm': '0px 0.5px 2px 0px rgba(16, 24, 40, 0.3)',
      },

      colors: {
        "label-text-purple": "rgba(163, 0, 244, 1)",
        "label-text-green": "rgba(18, 183, 106, 1)",
        "label-text-blue": "rgba(61, 36, 246, 1)",
        "label-text-red": "rgba(255, 22, 22, 1)",
        "label-text-aqua": "rgba(0, 219, 194, 1)",
        "label-text-yellow": "rgba(235, 188, 0, 1)",

        "label-bg-purple": "rgba(247, 212, 255, 1)",
        "label-bg-green": "rgba(209, 250, 223, 1)",
        "label-bg-blue": "rgba(223, 218, 255, 1)",
        "label-bg-red": "rgba(255, 223, 223, 1)",
        "label-bg-aqua": "rgba(209, 250, 247, 1)",
        "label-bg-yellow": "rgba(250, 250, 209, 1)",
        
        "card-title": "rgba(43, 45, 49, 1)",
        "card-description": "rgba(152, 162, 179, 1)",
        "background-color": "rgba(242, 244, 247, 1)",
        "gray-placeholder": "rgba(102, 112, 133, 1)",
        "checkbox-border": "rgba(214, 214, 214, 1)",
        "subtask-text": "rgba(65, 65, 65, 1)",
        "card": "rgba(252, 252, 253, 1)",
      },
    },
  },
  plugins: [],
}

