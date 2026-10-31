# Bundled site fonts

The WOFF2 files are the existing site's Google Fonts Latin assets, retained locally so previews and builds need no font-network request. Their original served filenames are:

- Inter: `e4af272ccee01ff0-s.p.woff2`
- Orbitron: `9a4ee768fed045da-s.p.woff2`
- JetBrains Mono: `bb3ef058b751a6ad-s.p.woff2`

Each family retains its adjacent SIL Open Font License text. `og-inter-400.ttf` and `og-inter-600.ttf` are static Inter subsets for the social card renderer, which requires a supported TTF rather than the site's WOFF2. They were instantiated from the bundled variable Inter font with fontTools and subset for the exact descriptor and tagline. If that copy changes, regenerate subsets with all required glyphs and visually check the image; a successful HTTP response does not establish complete text rendering.
