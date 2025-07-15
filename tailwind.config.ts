import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',       // If you're using the /app folder
    './pages/**/*.{js,ts,jsx,tsx}',     // If you're using the /pages folder
    './components/**/*.{js,ts,jsx,tsx}', // ShadCN components, etc.
  ],
  theme: {
    extend: {
      colors: {
        uncommonBlue: {
          DEFAULT: '#0747A1', // customize this to your brand blue
          dark: '#0747A1',
        },
      },
    },
  },
  plugins: [],
};

export default config;
