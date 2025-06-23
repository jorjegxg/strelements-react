// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d1117",
        card: "#1b2431",
        input: "#2b3445",
        accentBlue: "#3b82f6",
        accentGreen: "#16a34a",
        progressBlue: "#2684ff",
        textMain: "#e5e7eb",
        textMuted: "#9ca3af",
        violetAccent: "#a855f7",
      },
    },
  },
  plugins: [require("daisyui")],
};
