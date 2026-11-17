# Bundled site fonts

The WOFF2 files are the existing site's Google Fonts Latin assets, retained for the website refresh's local font wiring. This asset prerequisite alone does not switch RootLayout or the social renderer away from their existing network sources; the companion website change supplies that wiring. Their original served filenames are:

- Inter: `e4af272ccee01ff0-s.p.woff2`
- Orbitron: `9a4ee768fed045da-s.p.woff2`
- JetBrains Mono: `bb3ef058b751a6ad-s.p.woff2`

Each family retains its adjacent SIL Open Font License text. The social cards use static Inter TTF files because the image renderer requires a supported format. Both weights were instantiated from the bundled Inter WOFF2 using fontTools, then subset to printable ASCII (U+0020 through U+007E). The default card and the route-specific cards use only those characters. The presentation-assets test checks the actual copy against the bundled glyphs.
