# Governance-Aligned SEO Hardening Plan (P0 + P1)

## Summary
This plan implements only P0 and P1 priorities with deterministic behavior: sitemap reflects actual routes, indexing is controlled by a single env contract, canonical origin is single-source and enforced, feature JSON-LD is server-rendered, and key marketing images move to `next/image` for performance consistency.

## Public Interfaces / Contracts
1. Environment contract: introduce required `SITE_ENV` with allowed values `development | staging | production`; production build must fail if missing/invalid.
2. Canonical origin contract: canonical host is `https://www.cosmocrat.ai`; all canonical/OG/sitemap/robots/schema URLs derive from one origin value.
3. Backward compatibility: `SITE_STAGE` remains untouched for non-SEO logic, but SEO/indexing logic no longer depends on it.
4. No HTTP API shape changes and no route additions/removals beyond sitemap corrections.

## Implementation Plan
1. Normalize SEO origin and env source of truth.
`src/lib/siteConfig.ts`: add `origin` as normalized `NEXT_PUBLIC_SITE_URL` (trim trailing slash), default `https://www.cosmocrat.ai`, and enforce `www.cosmocrat.ai` when `SITE_ENV=production`; keep `url` as alias to `origin` to avoid breaking imports.
`src/lib/metadata.ts`: replace hardcoded canonical with `new URL(path, siteConfig.origin).toString()`; use same URL for `openGraph.url`.
`src/app/layout.tsx`: set `metadataBase` to `new URL(siteConfig.origin)`.
`src/lib/schemas.ts`: replace hardcoded base with `siteConfig.origin` so feature `WebPage` JSON-LD uses same canonical boundary.
`src/app/robots.ts`: use `SITE_ENV === 'production'` for crawl allow-listing and use `${siteConfig.origin}/sitemap.xml`.

2. Fix sitemap integrity mismatch.
`src/app/sitemap.ts`: replace `/request-access` with `/contact`, `/terms`, and `/waitlist`; preserve all current feature routes and `/docs`; keep existing frequency/priority policy unless explicitly route-specific.

3. Harden production indexing guardrails with deterministic env validation.
`next.config.js`: add strict `SITE_ENV` validator at config evaluation time; when `NODE_ENV=production`, throw on missing/invalid `SITE_ENV`.
`next.config.js`: update `X-Robots-Tag` gating to use only `SITE_ENV !== 'production'` (no `VERCEL_ENV`/`SITE_STAGE` branch).
`.env.example`: add `SITE_ENV=development`; update `NEXT_PUBLIC_SITE_URL` example to `https://www.cosmocrat.ai`.
`README.md`: update env table and verification section to document `SITE_ENV` contract and failure behavior.

4. Enforce host canonicalization at edge and unify image optimization prerequisites.
`next.config.js`: add `redirects()` rule `cosmocrat.ai -> https://www.cosmocrat.ai/:path*` with permanent redirect.
`next.config.js`: add `images.remotePatterns` for `https://storage.googleapis.com/cosmocrat/**` to support remote logo optimization via `next/image`.

5. Move feature JSON-LD from hydration-timed to SSR output.
`src/app/platform/page.tsx`
`src/app/runtime-governance/page.tsx`
`src/app/gate-system/page.tsx`
`src/app/decision-exhaust/page.tsx`
`src/app/drift-guard/page.tsx`
`src/app/chronicle-receipts/page.tsx`
`src/app/memory-infrastructure/page.tsx`
In each file, replace `next/script` `afterInteractive` JSON-LD injection with server-rendered `<script type="application/ld+json">` using `dangerouslySetInnerHTML` and existing schema payload.

6. Convert key marketing `<img>` elements to `next/image`.
`src/components/v1/Header.tsx`: switch wordmark logo to `next/image` with explicit dimensions.
`src/components/v1/Footer.tsx`: switch footer sigil logo to `next/image` with explicit dimensions.
`src/app/about/page.tsx`: switch founder headshot to `next/image` with explicit dimensions.
Preserve existing `alt` text and visual class behavior.

## Test Cases and Scenarios
1. Env contract test: `SITE_ENV=production npm run build` succeeds.
2. Env contract test: `SITE_ENV=staging npm run build` succeeds.
3. Env contract test: `npm run build` with missing `SITE_ENV` fails with explicit error message.
4. Sitemap correctness test: generated `sitemap.xml` includes `/contact`, `/terms`, `/waitlist`, excludes `/request-access`, and retains all feature routes.
5. Robots behavior test: in `SITE_ENV=production`, `robots.txt` allows `/` and disallows `/api/`; in non-production, disallows `/`.
6. Canonical consistency test: page `<link rel="canonical">`, OG URL, `robots.sitemap`, and sitemap URLs all share `https://www.cosmocrat.ai`.
7. Redirect test: request to `https://cosmocrat.ai/<path>` returns permanent redirect to `https://www.cosmocrat.ai/<path>`.
8. JSON-LD SSR test: initial HTML of feature pages contains `application/ld+json` before hydration.
9. Image optimization test: no `next/image` host configuration errors; logos/headshot render with stable dimensions.

## Rollout and Verification
1. Update deployment envs first: set `SITE_ENV` in dev/staging/prod before merge to avoid build failures.
2. Deploy staging with `SITE_ENV=staging`; verify `X-Robots-Tag: noindex, nofollow` and `robots.txt` disallow-all.
3. Deploy production with `SITE_ENV=production`; verify no `X-Robots-Tag`, correct robots/sitemap, and host redirect behavior.
4. Post-deploy checks: fetch `/robots.txt`, `/sitemap.xml`, and representative page heads for canonical/OG/schema consistency.

## Assumptions and Defaults
1. Scope is fixed to P0 + P1 only; P2 items (heading hierarchy and manifest enrichment) are deferred.
2. Canonical host remains `www` and apex host should always redirect to `www`.
3. Existing route inventory under `src/app` is authoritative for sitemap membership.
4. Existing JSON-LD entity model (Cosmocrat + founder + Orion Apex Capital parent org) remains unchanged; only render timing and URL consistency are changed.
