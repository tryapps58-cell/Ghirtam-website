/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colour Palette ───────────────────────────────────────────────
      colors: {
        // Core brand colours
        "sacred-gold":    "#D4A844",
        "earth-brown":    "#2C1A0E",
        "ivory-cream":    "#FDF6E3",
        "forest-sage":    "#5C7A4E",
        "terracotta":     "#A0522D",

        // Surface system (from stitch)
        "surface":                "#FFF9EB",
        "surface-low":            "#FAF3E0",
        "surface-container":      "#F4EEDB",
        "surface-container-high": "#EFE8D5",
        "surface-container-low":  "#FAF3E0",
        "surface-high":           "#EFE8D5",
        "surface-dim":            "#E0DAC7",
        "surface-bright":         "#FFF9EB",
        "surface-variant":        "#E9E2D0",

        // On-colours (text/icon on surface)
        "on-surface":          "#1E1C10",
        "on-surface-variant":  "#4E4636",
        "on-background":       "#1E1C10",
        "on-primary":          "#FFFFFF",
        "on-primary-container":"#553E00",

        // Outline
        "outline":         "#807664",
        "outline-variant": "#D2C5B1",

        // Semantic shortcuts
        "primary":           "#795900",
        "primary-container": "#D4A844",
        "primary-fixed":     "#FFDF9F",
        "primary-fixed-dim": "#EEC059",
        "inverse-primary":   "#EEC059",
        "inverse-surface":   "#333024",
        "inverse-on-surface":"#F7F0DE",

        // Secondary
        "secondary":           "#72594A",
        "secondary-container": "#FBD9C5",
        "on-secondary":        "#FFFFFF",
        "on-secondary-container":"#775D4E",

        // Error
        "error":           "#BA1A1A",
        "error-container": "#FFDAD6",
        "on-error":        "#FFFFFF",
        "on-error-container":"#93000A",

        // Background
        "background": "#FFF9EB",
      },

      // ─── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        display:    ["'Cormorant Garamond'", "Georgia", "serif"],
        heading:    ["'Cormorant Garamond'", "Georgia", "serif"],
        serif:      ["'Cormorant Garamond'", "Georgia", "serif"],
        body:       ["'Nunito'", "system-ui", "sans-serif"],
        sans:       ["'Nunito'", "system-ui", "sans-serif"],
        quote:      ["'Playfair Display'", "Georgia", "serif"],
      },

      // ─── Font Sizes (matching stitch tokens) ────────────────────────────────
      fontSize: {
        "display-lg":   ["64px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-xl":  ["48px", { lineHeight: "1.2", fontWeight: "500" }],
        "headline-lg":  ["32px", { lineHeight: "1.3", fontWeight: "500" }],
        "headline-md":  ["24px", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg":      ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md":      ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-md":     ["14px", { lineHeight: "1.2", letterSpacing: "0.05em", fontWeight: "700" }],
        "label-sm":     ["12px", { lineHeight: "1.2", letterSpacing: "0.08em", fontWeight: "700" }],
      },

      // ─── Spacing Tokens ─────────────────────────────────────────────────────
      spacing: {
        "section-gap":      "120px",
        "section-gap-sm":   "80px",
        "margin-desktop":   "64px",
        "margin-mobile":    "20px",
        "gutter":           "24px",
        "container-max":    "1536px",
      },

      maxWidth: {
        "container": "1536px",
      },

      // ─── Border Radius ───────────────────────────────────────────────────────
      borderRadius: {
        "sm":   "0.125rem",
        "md":   "0.25rem",
        "lg":   "0.5rem",
      },

      // ─── Box Shadows ─────────────────────────────────────────────────────────
      boxShadow: {
        "gold-sm":  "0 4px 10px -4px rgba(212,168,68,0.30)",
        "gold-md":  "0 8px 30px -10px rgba(212,168,68,0.20)",
        "gold-lg":  "0 20px 60px -15px rgba(212,168,68,0.25)",
        "card":     "0 2px 12px 0 rgba(44,26,14,0.08)",
        "nav":      "0 4px 20px -10px rgba(212,168,68,0.15)",
      },

      // ─── Animations ──────────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up":   "fade-up 0.6s ease-out forwards",
        "fade-in":   "fade-in 0.4s ease-out forwards",
        shimmer:     "shimmer 2s infinite linear",
        marquee:     "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
}
