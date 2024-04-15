/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  prefix: "",
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      borderRadius: {
        "4xl": "28px",
        "5xl": "32px",
        large: "40px",
        small: "20px",
      },
      fontFamily: {
        sans: ["Clash Grotesk", "sans-serif"],
        os: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        xxs: "10px",
      },
      backgroundImage: {
        sky: "linear-gradient(180deg, #D7EEFF 0%, rgba(229, 229, 229, 0.00) 57.7%)",
        404: "url('/bg/404lab.svg')",
        pattern: "url('/bg/pattern.svg')",
        sky2: "linear-gradient(0deg, #12AAFF 0%, #97DAFF 72.77%, #FFFFFF 122.6%)",
        "gradient-sky":
          "linear-gradient(0deg, rgba(18, 170, 255, 0.39) -136.16%, rgba(18, 170, 255, 0.00) 63.47%)",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        secondary: {
          light: "#393939",
          DEFAULT: "#252525",
        },
        primary: {
          light: "#E2F3FF",
          DEFAULT: "#12AAFF",
          sky: "#9DCCED",
          navy: "#213147",
        },
        navy: {
          DEFAULT: "#213147",
        },
        blue: {
          light: "#E0F2FE",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
