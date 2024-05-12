import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ff7a33",
        success: "#1abf57",
        blue: "#3498db",
        error: "#dc2626",
      },
    },
    fontFamily: {
      sans: ["Kumbh Sans", "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
export default config;
