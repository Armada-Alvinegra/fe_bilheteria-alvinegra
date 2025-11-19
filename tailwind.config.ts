import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4eefc',
          100: '#eaddf9',
          200: '#d6bbf3',
          300: '#c299ed',
          400: '#ae77e7',
          500: '#9b51e0',
          600: '#7c41b3',
          700: '#5d3186',
          800: '#3e205a',
          900: '#1f102d',
          DEFAULT: '#9b51e0',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
