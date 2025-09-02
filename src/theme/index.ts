import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#e8f6fd" },
          100: { value: "#c2e7fb" },
          200: { value: "#8dd4f7" },
          300: { value: "#4bbef2" },
          400: { value: "#1da7ed" },
          500: { value: "#0087DD" },
          600: { value: "#0074c4" },
          700: { value: "#005da0" },
          800: { value: "#004883" },
          900: { value: "#003568" },
          950: { value: "#002447" }
        },

        accent: {
          50: { value: "#f3e5f5" },
          100: { value: "#e1bee7" },
          200: { value: "#ce93d8" },
          300: { value: "#ba68c8" },
          400: { value: "#ab47bc" },
          500: { value: "#9c27b0" },
          600: { value: "#8e24aa" },
          700: { value: "#7b1fa2" },
          800: { value: "#6a1b9a" },
          900: { value: "#4a148c" },
          950: { value: "#2e0854" }
        },

        success: {
          50: { value: "#e8f5e8" },
          100: { value: "#c8e6c8" },
          200: { value: "#a5d6a5" },
          300: { value: "#81c784" },
          400: { value: "#66bb6a" },
          500: { value: "#4caf50" },
          600: { value: "#43a047" },
          700: { value: "#388e3c" },
          800: { value: "#2e7d32" },
          900: { value: "#1b5e20" },
          950: { value: "#0f3f14" }
        },

        warning: {
          50: { value: "#fff8e1" },
          100: { value: "#ffecb3" },
          200: { value: "#ffe082" },
          300: { value: "#ffd54f" },
          400: { value: "#ffca28" },
          500: { value: "#ffc107" },
          600: { value: "#ffb300" },
          700: { value: "#ffa000" },
          800: { value: "#ff8f00" },
          900: { value: "#ff6f00" },
          950: { value: "#cc5600" }
        },

        error: {
          50: { value: "#ffebee" },
          100: { value: "#ffcdd2" },
          200: { value: "#ef9a9a" },
          300: { value: "#e57373" },
          400: { value: "#ef5350" },
          500: { value: "#f44336" },
          600: { value: "#e53935" },
          700: { value: "#d32f2f" },
          800: { value: "#c62828" },
          900: { value: "#b71c1c" },
          950: { value: "#8b1538" }
        },
      }
    },

    semanticTokens: {
      colors: {
        "color-palette": {
          "50": { value: "{colors.brand.50}" },
          "100": { value: "{colors.brand.100}" },
          "200": { value: "{colors.brand.200}" },
          "300": { value: "{colors.brand.300}" },
          "400": { value: "{colors.brand.400}" },
          "500": { value: "{colors.brand.500}" },
          "600": { value: "{colors.brand.600}" },
          "700": { value: "{colors.brand.700}" },
          "800": { value: "{colors.brand.800}" },
          "900": { value: "{colors.brand.900}" },
          "950": { value: "{colors.brand.950}" },

          "solid": { value: "{colors.brand.500}" },
          "contrast": { value: "white" },
          "fg": { value: "{colors.brand.700}" },
          "muted": { value: "{colors.brand.100}" },
          "subtle": { value: "{colors.brand.50}" },
          "emphasized": { value: "{colors.brand.600}" },
          "focusRing": { value: "{colors.brand.500}" }
        },

        bg: {
          "canvas": {
            value: { base: "white", _dark: "gray.900" }
          },
          "subtle": {
            value: { base: "gray.50", _dark: "gray.800" }
          }
        }
      }
    }
  }
})

export const system = createSystem(defaultConfig, config)
