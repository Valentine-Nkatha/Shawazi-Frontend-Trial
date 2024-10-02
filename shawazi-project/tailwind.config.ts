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
        background: "var(--background)",
        primary: "#3E1C00", 
        foreground: "#508408",
        secondary: "#E4960E", 
        white: "#FFFFFF", 
        black: "#000000",
        hover: "#508408",
        'secondary-light': '#FFEDD5',
        'custom-green': '#508408',
        'border-color': '#F30808',
      },
    },
  },
  plugins: [],
};
export default config;
