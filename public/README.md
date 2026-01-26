# Cosmocrat Favicon Pack

This folder contains a ready-to-drop favicon set generated from the Cosmocrat logo.

## Files included

- `favicon.ico` (multi-size: 16×16, 32×32, 48×48)
- `favicon-16x16.png`
- `favicon-32x32.png`
- `favicon-48x48.png`
- `favicon-96x96.png`
- `apple-touch-icon.png` (180×180)
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `mstile-150x150.png`
- `site.webmanifest`
- `browserconfig.xml`

## Install

1. Copy all files to your site root (e.g., `public/` in Next.js, `static/`, or your CDN bucket).
2. Add the following tags in your `<head>`:

```html
<!-- Basic -->
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

<!-- Apple -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- PWA / Android -->
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#0B0B0F">

<!-- Windows tiles -->
<meta name="msapplication-TileColor" content="#0B0B0F">
<meta name="msapplication-config" content="/browserconfig.xml">
```

## Notes

- All PNGs are transparent and padded slightly to avoid edge clipping at small sizes.
- If you serve assets from a subpath (e.g., `/assets/`), update the href/src paths accordingly.

