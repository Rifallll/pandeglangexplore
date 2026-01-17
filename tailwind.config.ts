import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom colors for Pandeglang theme
        pandeglang: {
          green: {
            DEFAULT: "#34A853", // Hijau Alam
            50: "#E6F4E8",
            100: "#D1EAD4",
            200: "#A8D8B0",
            300: "#7FC78C",
            400: "#56B668",
            500: "#34A853",
            600: "#2A8742",
            700: "#206631",
            800: "#164520",
            900: "#0C2410",
          },
          blue: {
            DEFAULT: "#4285F4", // Biru Laut
            50: "#E8F0FE",
            100: "#D1E0FC",
            200: "#A4C2F7",
            300: "#77A3F2",
            400: "#4A85ED",
            500: "#4285F4",
            600: "#356BC0",
            700: "#28528C",
            800: "#1B3959",
            900: "#0E2026",
          },
          brown: {
            DEFAULT: "#8B4513", // Cokelat Tanah
            50: "#F2EBE6",
            100: "#E6DCD1",
            200: "#CCBBA3",
            300: "#B39A75",
            400: "#997947",
            500: "#8B4513",
            600: "#70370F",
            700: "#54290B",
            800: "#381B07",
            900: "#1C0D03",
          },
          white: {
            DEFAULT: "#F8F8F8", // Putih Hangat
            50: "#FFFFFF",
            100: "#F8F8F8",
            200: "#EFEFEF",
            300: "#E0E0E0",
            400: "#D1D1D1",
            500: "#C2C2C2",
            600: "#B3B3B3",
            700: "#A4A4A4",
            800: "#959595",
            900: "#868686",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;