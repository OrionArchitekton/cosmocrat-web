---
verified: 2026-10-30
review_after: 2026-11-30
topics: [cosmocrat, motion, local-rendering]
references:
  - tools/cosmocrat-intro/serve.py
  - tools/cosmocrat-intro/renderer.html
  - tools/cosmocrat-intro/README.md
  - tools/cosmocrat-intro/test_serve.py
---
# Local motion assets

The renderer is an optional, manually started loopback helper. Run it with `python3 tools/cosmocrat-intro/serve.py` and use the exact `http://127.0.0.1:4190` URL. It accepts writes only from that same browser origin, to two fixed WebM filenames, with a bounded size and WebM signature. It refuses existing targets. It is not a production service or publication path.

Follow the generation and encoding steps in `tools/cosmocrat-intro/README.md`. Preserve existing renders before a new capture. Run `python3 tools/cosmocrat-intro/test_serve.py` to check foreign-origin/host refusal, format/path refusal and preservation. Inspect real media playback and contact frames separately; the helper tests do not establish creative acceptance.

Stop the foreground helper with Ctrl-C when finished. Do not add a timer or expose its port. Restore a prior retained asset version to undo a local render change. Any public asset replacement still follows the website's protected source/release process and production verification.
