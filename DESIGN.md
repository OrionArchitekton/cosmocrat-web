---
brand: "cosmocrat-web"
name: "Cosmocrat OS"
domain: "cosmocrat.ai"
polarity: "dark"
tokens: "tokens/brand.tokens.json"
---

# Cosmocrat OS Design System

Dark systems-engineering governance aesthetic: Kernel Slate (`#0B1120`) ground, `#151F32` card surfaces, `#E2E8F0` ink, and Amber (`#F59E0B`) action controls.

## Palette and Contrast Rules

- Ground: `#0B1120`
- Surface: `#151F32`, Elevated: `#1E293B`
- Primary ink: `#E2E8F0` (`>14:1` on `#0B1120`)
- Muted ink: `#94A3B8` (`>=6.4:1` on `#0B1120`)
- Primary CTA: solid Amber `#F59E0B` pairs with `#0B1120` dark ink (`>9.0:1`).
- Above-the-fold rule: primary `H1`, value proposition, and CTA must render above `900px` on `1280x900` desktop without blocking behind heavy video embeds.

## Typography

- Display / Headings: `Space Grotesk`
- Body / UI: `IBM Plex Sans`
- Monospace kernel specs: `JetBrains Mono`

## Shape and Motion

- Radii: `4px` (`sm`), `6px` (`md`), `10px` (`lg`).
- Lazy interactive plots and Motion reveals with mandatory `prefers-reduced-motion: reduce`.
