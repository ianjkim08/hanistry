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
        ink: "#0f1716",
        surface: "#141e1c",
        paper: "#edf0e8",
        muted: "#a8b0a8",
        line: "rgba(237, 240, 232, 0.14)",
        accent: "#d2ad63",
        jade: "#d2ad63",
        brass: "#d5a853",
        han: "#6ea8fe",
        plum: "#d973a5"
      },
      fontFamily: {
        sans: ["Avenir Next", "Avenir", "Helvetica Neue", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Iowan Old Style", "Baskerville", "Times New Roman", "serif"],
        mono: ["SFMono-Regular", "Consolas", "Liberation Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 60px rgba(98, 210, 162, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
