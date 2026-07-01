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
          blueLight: "#1A6BBF",
          gold: "#F2B705",
          goldSoft: "#FFF6D8",
          goldDeep: "#A6790A",
          green: "#A6790A",
          greenSoft: "#FFF6D8",
          red: "#B42318",
          ink: "#14213D",
          mist: "#F7FAFC"
        }
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "ui-sans-serif", "system-ui", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(11, 53, 88, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
