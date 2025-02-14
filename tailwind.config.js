/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Mobile-first font sizes
        h1: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        h2: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        h3: ["1.25rem", { lineHeight: "1.4" }],
        body: ["0.875rem", { lineHeight: "1.6" }],
        small: ["0.75rem", { lineHeight: "1.5" }],
        label: ["0.75rem", { lineHeight: "1.4" }],

        // Tablet (sm) font sizes
        sm: {
          h1: ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
          h2: ["1.75rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
          h3: ["1.5rem", { lineHeight: "1.4" }],
          body: ["1rem", { lineHeight: "1.6" }],
        },

        // Desktop (lg) font sizes
        lg: {
          h1: ["2.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
          h2: ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
          h3: ["1.75rem", { lineHeight: "1.4" }],
          body: ["1rem", { lineHeight: "1.6" }],
        },
      },
      // Rest of the configuration remains the same
      colors: {
        primary: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc8fb",
          400: "#36aaf4",
          500: "#0c8de4",
          600: "#006fc2",
          700: "#015a9e",
          800: "#064b83",
          900: "#0a406d",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center center",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
      },
    },
  },
  plugins: [],
};
