const daisyui = require('daisyui');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        relearnlight: {
          primary: '#ff00ff',
          secondary: '#00ffff',
          neutral: '#000000',
          'base-100': '#ffffff',
        },
      },
      'coffee',
      'dark',
    ],
    darkTheme: 'dark',
  },
};
