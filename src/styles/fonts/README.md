# Bundled site fonts

The WOFF2 files are the existing site's Google Fonts Latin assets, retained for the website refresh's local font wiring. This asset prerequisite alone does not switch RootLayout or the social renderer away from their existing network sources; the companion website change supplies that wiring. Their original served filenames are:

- Inter: `e4af272ccee01ff0-s.p.woff2`
- Orbitron: `9a4ee768fed045da-s.p.woff2`
- JetBrains Mono: `bb3ef058b751a6ad-s.p.woff2`

Each family retains its adjacent SIL Open Font License text. `og-inter-400.ttf` and `og-inter-600.ttf` are static Inter subsets for the companion Cosmocrat OS social card, which requires a supported TTF rather than the site's WOFF2. They were instantiated from the bundled variable Inter font with fontTools. Their declared target copy is "Tools for human-directed AI work." (600) and "Coordinate agents. Carry context forward. Keep authority with you." (400). These subsets do not claim to cover the older enterprise card, which continues using its existing font fetch until the companion change lands. `node --test tests/presentation-assets.test.mjs` checks the declared glyph coverage and, once bundled fonts are active, the actual card copy. If the copy changes, regenerate subsets with all required glyphs and visually inspect the image; an HTTP success alone does not prove complete text rendering.
