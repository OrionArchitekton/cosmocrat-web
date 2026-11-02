---
verified: 2026-10-31
review_after: 2026-11-07
topics:
  - cosmocrat-os
  - website-preview
  - release-verification
references:
  - specs/cosmocrat-os-web-spec.md
  - docs/cosmocrat-os-positioning.md
  - next.config.js
  - src/app/layout.tsx
  - src/lib/toolCatalog.ts
  - tests/site-pages.test.mjs
  - package.json
  - package-lock.json
  - src/app/api/waitlist/route.ts
  - tests/waitlist-http.test.mjs
  - tests/fixtures/intake-network.cjs
---

# Cosmocrat OS website release

The October 30, 2026 website release is historical. Its approval does not authorize later dependency, intake or navigation changes. Obtain scoped approval for the exact new source and deployment before release, complete the protected PR/review process, and verify the deployed artifact and actual public behavior. Package, guide and video releases retain their separate authority.

## Local validation

Use Node 20 from `.nvmrc`, at least 20.9 to satisfy the image library's runtime requirement. Install the existing lock with `npm ci`. Do not load production credentials or submit real intake forms. Keep the preview bound to loopback.

```bash
SITE_ENV=staging NEXT_TELEMETRY_DISABLED=1 npm run lint
npm run typecheck
SITE_ENV=staging NEXT_PUBLIC_SITE_URL=http://127.0.0.1:4181 NEXT_TELEMETRY_DISABLED=1 npm run build
SITE_ENV=staging NEXT_PUBLIC_SITE_URL=http://127.0.0.1:4181 NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1 --port 4181
```

In another terminal, `SITE_TEST_ORIGIN=http://127.0.0.1:4181 node --test tests/*http.test.mjs tests/site-pages.test.mjs` exercises the built site. The site suites refuse a non-loopback target. The intake regression starts its own loopback server with an explicit synthetic environment and fake database/mail endpoints. Its test-only preload refuses external fetches; no production credential or real account is needed. It verifies invalid input, honeypot refusal, normalized storage, duplicate behavior, reply-address serialization, escaped notification text and honest mail acknowledgement. An accepted provider ID means API acceptance, not delivery to an inbox.

The intake test passes its preload as a decoded filesystem argv value, including in checkouts with spaces. Next binds an OS-assigned port and the test reads that owned server's actual loopback address; it does not release a reserved port before startup.

Stop a dev process before building in the same checkout; both use the same generated output directory. Do not run dev and production builds concurrently there.

Inspect `/` and `/tools` on desktop, 390-pixel and 320-pixel widths. Exercise category plus search, empty-state reset, keyboard activation, mobile menu and native scope disclosures. Confirm all ten catalog entries and exact guide/release links remain available with scripts disabled. Verify images/fonts load, no horizontal overflow occurs, and local/staging pages load no Google Tag Manager script. Inspect `/og?v=4` as an image, including the original wordmark. A 200 response alone does not prove its visible contents.

Local/staging pages carry `noindex, nofollow` in metadata and response headers. Their robots policy disallows crawling. The local preview banner and analytics behavior are built with the selected environment; changing only the runtime environment does not convert a staging artifact into a production build.

## Dependency maintenance

The selected source uses Next 15.5.28 and React 19.2.9, with sharp 0.35.5 in the lock, patched validation/mail clients and a Node-20-compatible Supabase client series. Next 14 is outside the [supported releases](https://nextjs.org/support-policy); the [SVG optimizer advisory](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw) names Next 15.5.28 and sharp 0.35.5 as patched choices. Recheck the support window before a future upgrade.

`postcss` and `postcss-selector-parser` overrides select patched versions within their existing major versions. Retain and recheck them when updating the framework or typography plugin; do not force a minimatch major upgrade into tools that expect its older API.

Sharp is Apache-2.0 licensed; its platform libvips packages carry LGPL-3.0-or-later and other dependency notices recorded by the lock and installed package README. [Upstream packaging documentation](https://github.com/lovell/sharp-libvips#licences) describes the shared libraries and their license compatibility. Preserve those notices and review the upstream terms for any redistribution of native artifacts. This website release adds no public native-binary download and does not change the application's license.

Run both `npm audit --audit-level=high` and `npm audit --omit=dev`. The selected graph has no high/critical findings and no production findings. A full audit still reports the moderate [minimatch pattern-amplification advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) through development-only tools. Keep that finding visible. Its affected preprocessing code exists in the installed v9 slot; this site does not request optimization level 2 or expose caller-supplied glob patterns. This assessment does not waive an independently required zero-findings gate or certify future configurations. Do not expose development tooling as a public service.

## Public rollout and monitoring

Use the existing protected website release path after the owner approves the exact candidate and outward actions. Keep `next.config.js`'s production-origin guard: production requires `NEXT_PUBLIC_SITE_URL=https://www.cosmocrat.ai`. Never weaken it to run a preview. A production build is separate from merge and deployment authority.

Re-verify release versions, guide pins and video relationships in `src/lib/toolCatalog.ts` before release. Compare the deployed source revision with the approved revision. Read back the public homepage, tools, origin, documentation, existing architecture, legal and intake GET routes. Verify the social card visually, production canonical URLs, JSON-LD identities, sitemap, `llms.txt`, robots/indexing and the configured production analytics behavior. Do not submit a real intake record as a health check.

Monitor broken destination links, catalog/guide version drift, resource errors and normal website error reporting after release. Existing API, data stores, credentials and intake ownership are unchanged. A catalog click or healthy web process does not establish package adoption or an external workflow outcome.

## Recovery

For a local preview, stop only the process started for this checkout; leave the branch and accepted static preview intact for review. Restore tracked generated build metadata before committing if typecheck changed it incidentally.

If an approved public rollout fails, use the existing hosting rollback to the last verified deployment, with operator authority for that public change. Prepare a normal source revert of this website change for review; do not reset history, delete intake records or alter package repositories. Verify the restored public routes and revision after rollback. Preserve the historical positioning spec and this release’s source and verification records.
