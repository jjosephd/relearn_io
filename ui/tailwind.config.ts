import { config } from 'tailwindcss';
import daisyui from 'daisyui';

export default config({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['dark'],
    darkTheme: 'dark',
  },
  darkMode: 'class', // Add this line
  classNameDark: 'dark', // Add this line
});
