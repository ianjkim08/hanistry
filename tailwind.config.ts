import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#071013",
        paper: "#eff6f4",
        jade: "#62d2a2",
        brass: "#d5a853",
        han: "#6ea8fe",
        plum: "#d973a5"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Newsreader", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(98, 210, 162, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
