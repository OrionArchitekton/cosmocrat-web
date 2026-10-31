# Existing Cosmocrat assets

The wordmark and sigil SVG files are retained unchanged. `cosmocrat-wordmark.png` is the existing official social-card wordmark, copied without transformation from:

`https://storage.googleapis.com/cosmocrat/cosmocrat_logos_graphics/wordmark-logo_light.png`

The bundled file was byte-compared with that source on October 30, 2026: 604 by 74 pixels, SHA256 `5eecbec7a21c7f79d8f0d2d319e46aceeb597dedb114f261a40d40fa29969a6b`. The presentation-asset test retains that identity. The existing SVG and this official PNG are distinct original assets; neither is a recreated mark.

It is bundled locally for the website refresh's social renderer, which does not fully reproduce the SVG's nested image/filter/mask composition. The webpage retains the original SVG; the companion website change wires the card to this original PNG. The asset prerequisite alone leaves the existing renderer unchanged. No logotype has been recreated with a substitute font.
