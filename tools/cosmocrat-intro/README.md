# Cosmocrat welcome assets

These are the supporting assets for the owner-approved Cosmocrat OS website release. The existing wordmark, sigil and navy/amber palette are retained. The stylesheet is not imported by the current homepage; the website follow-up supplies the player and static sections.

The two silent MP4s are 22 seconds, 30 fps, H.264/yuv420p with fast start. Desktop is 1920 by 1080; portrait is 1080 by 1440. Posters use the closing brand frame. The local fonts retain their OFL notices.

To regenerate privately, run `python3 tools/cosmocrat-intro/serve.py`, open its loopback URL `/` or `/?mobile=1`, wait for `window.ready`, then invoke `window.record()` and wait for `window.captureDone`. Fixed WebM outputs refuse overwrites. Preserve the original render, encode to the formats above and inspect actual desktop/portrait playback before replacing an asset. No account, credentials or paid provider are needed.

These files do not activate a player, change public page copy or establish governance integration for an Orion tool. Release the complete website through the protected PR path and verify the public artifact and playback after deployment. Keep the prior hosting deployment as the rollback target.
