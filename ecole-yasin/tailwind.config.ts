import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0f766e",
          light: "#14b8a6",
          dark: "#134e4a"
        },
        accent: "#f59e0b"
      }
    }
  },
  plugins: []
};

export default config;
