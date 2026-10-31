---
verified: 2026-10-30
review_after: 2026-11-30
topics: [cosmocrat-os, motion, website, release]
references:
  - specs/cosmocrat-motion-welcome-spec.md
  - src/components/os/MotionWelcome.tsx
  - tools/cosmocrat-intro/renderer.html
  - tools/cosmocrat-intro/serve.py
  - public/media/cosmocrat/cosmocrat-welcome-desktop.mp4
  - public/media/cosmocrat/cosmocrat-welcome-mobile.mp4
---
# Cosmocrat OS motion welcome

The 22-second silent introduction uses the existing wordmark, sigil, Inter font and navy/amber palette. It presents the ten catalogued tools as independent capabilities, with preview/experimental labels. Desktop and portrait compositions keep names readable. The accepted static homepage follows immediately.

The player offers pause, replay and a direct continue link. Reduced-motion users get a still with explicit play. Playback pauses offscreen or when the document is hidden. Native controls remain available without page JavaScript. A media failure leaves the static site accessible. No audio track, external video host or new analytics is introduced.

## Regenerate privately

Run `python3 tools/cosmocrat-intro/serve.py` from the repo. The renderer listens only on loopback port 4190 and serves a fixed allowlist of original assets. Open `/` for desktop or `/?mobile=1` for portrait in an isolated browser. Wait for `window.ready`, invoke `window.record()` and wait for `window.captureDone`. Its two fixed WebM outputs refuse overwrites. Preserve a prior render before creating another version. No credentials or paid provider are needed.

Encode the retained WebM to H.264 MP4 with FFmpeg, 30 fps, yuv420p, 22 seconds, no audio and `+faststart`; create a still from the closing brand frame. Update both source assets and this version's media identities. Inspect actual contact frames and full playback on desktop/mobile before replacing shipped clips. A render is a creative candidate until reviewed.

## Validate and release

Use Node 20 and the existing lint/typecheck/build. Run the local HTTP tests against a loopback server. In an anonymous browser, observe the selected video's dimensions, advancing playback, pause, replay, skip, portrait selection, reduced-motion suppression, no-JavaScript access and fallback behavior. Read back media status and range delivery. Do not infer playback from a 200 response.

With the separately installed `agent-browser` and Chrome available, `SITE_TEST_ORIGIN=http://127.0.0.1:4181 python3 tests/site-browser.test.py` repeats the player, catalog, keyboard and responsive checks against the built site. It uses a GET-only loopback fixture to set initial document visibility before hydration, then proves first visibility starts playback without scrolling. The fixture also verifies reduced-motion suppression. It refuses production origins and submits no forms. Inspect no-JavaScript and media-failure behavior separately as described above.

For a public release, retain the production-origin guard and use the protected PR workflow. Verify required checks and current-head automated review before the owner-approved merge. After the hosting deployment is READY, bind its source revision/alias to the merged source, compare served media hashes and inspect the real public homepage/catalog on desktop/mobile. Local tests or a source merge alone do not establish deployment.

## Recovery

Pause or skip always leaves the static homepage usable. For a deployment regression, restore the last verified hosting deployment under operator authority and read back its real routes; prepare a normal source revert through review. Keep original media, source and receipts. Do not alter legal/intake records, package repositories, recording packets or release schedules.
