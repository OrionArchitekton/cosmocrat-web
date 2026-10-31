---
verified: 2026-10-30
review_after: 2026-11-30
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
---

# Cosmocrat OS website candidate

The owner approved the Cosmocrat OS website release on October 30, 2026. Use the protected PR/review process and verify the deployed artifact and actual public behavior. Package, guide and video releases retain their separate authority.

## Local validation

Use Node 20 from `.nvmrc`. Install the existing lock with `npm ci`. Do not load production credentials or submit intake forms. Keep the preview bound to loopback.

```bash
SITE_ENV=staging NEXT_TELEMETRY_DISABLED=1 npm run lint
npm run typecheck
SITE_ENV=staging NEXT_PUBLIC_SITE_URL=http://127.0.0.1:4181 NEXT_TELEMETRY_DISABLED=1 npm run build
SITE_ENV=staging NEXT_PUBLIC_SITE_URL=http://127.0.0.1:4181 NEXT_TELEMETRY_DISABLED=1 npm run start -- --hostname 127.0.0.1 --port 4181
```

In another terminal, `SITE_TEST_ORIGIN=http://127.0.0.1:4181 node --test tests/site-pages.test.mjs` exercises the built site. The suite refuses a non-loopback target. Stop a dev process before building in the same checkout; both use the same generated output directory. Do not run dev and production builds concurrently there.

Inspect `/` and `/tools` on desktop, 390-pixel and 320-pixel widths. Exercise category plus search, empty-state reset, keyboard activation, mobile menu and native scope disclosures. Confirm all ten catalog entries and exact guide/release links remain available with scripts disabled. Verify images/fonts load, no horizontal overflow occurs, and local/staging pages load no Google Tag Manager script. Inspect `/og?v=4` as an image, including the original wordmark. A 200 response alone does not prove its visible contents.

Local/staging pages carry `noindex, nofollow` in metadata and response headers. Their robots policy disallows crawling. The local preview banner and analytics behavior are built with the selected environment; changing only the runtime environment does not convert a staging artifact into a production build.

## Future public rollout and monitoring

Use the existing protected website release path under the recorded owner approval. Keep `next.config.js`'s production-origin guard: production requires `NEXT_PUBLIC_SITE_URL=https://www.cosmocrat.ai`. Never weaken it to run a preview. A production build is separate from merge and deployment authority.

Re-verify release versions, guide pins and video relationships in `src/lib/toolCatalog.ts` before release. Compare the deployed source revision with the approved revision. Read back the public homepage, tools, origin, documentation, existing architecture, legal and intake GET routes. Verify the social card visually, production canonical URLs, JSON-LD identities, sitemap, `llms.txt`, robots/indexing and the configured production analytics behavior. Do not submit a real intake record as a health check.

Monitor broken destination links, catalog/guide version drift, resource errors and normal website error reporting after release. Existing API, data stores, credentials and intake ownership are unchanged. A catalog click or healthy web process does not establish package adoption or an external workflow outcome.

## Recovery

For a local preview, stop only the process started for this checkout; leave the branch and accepted static preview intact for review. Restore tracked generated build metadata before committing if typecheck changed it incidentally.

If a later approved public rollout fails, use the existing hosting rollback to the last verified deployment, with operator authority for that public change. Prepare a normal source revert of this website change for review; do not reset history, delete intake records or alter package repositories. Verify the restored public routes and revision after rollback. Preserve the old positioning spec and this proposal as the decision record.
