import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
      },
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
        ink: {
          DEFAULT: "hsl(var(--ink-strong))",
          muted: "hsl(var(--ink-muted))",
          faint: "hsl(var(--ink-faint))",
          strong: "hsl(var(--ink-strong))",
        },
        line: {
          DEFAULT: "hsl(var(--line))",
          soft: "hsl(var(--line-soft))",
          strong: "hsl(var(--line-strong))",
        },
        surface: {
          DEFAULT: "hsl(var(--surface))",
          raised: "hsl(var(--surface-raised))",
          deep: "hsl(var(--surface-deep))",
        },
        blue: {
          DEFAULT: "hsl(var(--blue-bright))",
          bright: "hsl(var(--blue-bright))",
          deep: "hsl(var(--blue-deep))",
        },
        cyan: {
          DEFAULT: "hsl(var(--cyan-bright))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        prose: "65ch",
      },
      boxShadow: {
        edge: "0 1px 0 0 hsl(var(--line))",
        "edge-t": "inset 0 1px 0 0 hsl(var(--line))",
        panel: "0 24px 60px -24px hsl(224 60% 2% / 0.9)",
        lift: "0 12px 40px -12px hsl(224 60% 3% / 0.7)",
      },
      letterSpacing: {
        widest2: "0.24em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;