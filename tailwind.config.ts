import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f1226",
        muted: "#5b6082",
        electric: "#3b6dff",
        violet: "#7c5cff",
        cyan: "#06b6d4",
        magenta: "#e0408f",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(60px,-40px,0) scale(1.12)" },
          "66%": { transform: "translate3d(-40px,30px,0) scale(0.95)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        sheen: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        travel: {
          "0%": { left: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { left: "100%", opacity: "0" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marqueeReverse 46s linear infinite",
        sheen: "sheen 5s linear infinite",
        travel: "travel 3.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
