import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0B3558",
          blueSoft: "#EAF2F8",
          gold: "#F2B705",
          goldSoft: "#FFF6D8",
          green: "#167A54",
          greenSoft: "#E9F6EF",
          red: "#B42318",
          ink: "#14213D",
          mist: "#F7FAFC"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(11, 53, 88, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
