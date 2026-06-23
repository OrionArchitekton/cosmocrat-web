1. Executive Summary (5 bullets max)
   * App Router SEO foundations are in place: centralized metadata, `robots.ts`, and `sitemap.ts` are implemented (`src/app/layout.tsx (line 34)`, `src/app/robots.ts (line 4)`, `src/app/sitemap.ts (line 4)`).
   * Highest-impact issue: sitemap includes a non-existent route and omits live marketing routes (`src/app/sitemap.ts (line 20)`, `src/app/contact/page.tsx (line 9)`, `src/app/terms/page.tsx (line 7)`, `src/app/waitlist/page.tsx (line 8)`).
   * URL authority is inconsistent: canonical and metadata base are hardcoded www, while runtime URL can come from env (`src/lib/siteConfig.ts (line 7)`, `src/lib/metadata.ts (line 22)`, `src/app/layout.tsx (line 40)`, `.env.example (line 5)`).
   * JSON-LD coverage is strong (Organization/WebSite/SoftwareApplication + feature WebPage schemas), but feature schemas are injected afterInteractive (`src/app/layout.tsx (line 82)`, `src/app/platform/page.tsx (line 28)`).
   * Accessibility signals are generally good (single H1 per route, no missing alt on <img>), with heading-level gaps on docs/legal pages (`src/app/docs/page.tsx (line 19)`, `src/app/docs/page.tsx (line 39)`, `src/app/privacy/page.tsx (line 17)`, `src/app/privacy/page.tsx (line 32)`).
2. Indexability & Crawlability
   * `robots.txt` status: Implemented via App Router metadata route (`src/app/robots.ts (line 4)`), not static `public/robots.txt`.
   * Production robots behavior: allow /, disallow /api/ (`src/app/robots.ts (line 10)`, `src/app/robots.ts (line 11)`).
   * Non-prod robots behavior: disallow all (`src/app/robots.ts (line 11)` with non-prod branch).
   * `sitemap.xml` status: Implemented via App Router metadata route (`src/app/sitemap.ts (line 4)`), not static `public/sitemap.xml`.
   * Sitemap issues: includes /request-access (`src/app/sitemap.ts (line 20)`) but no matching route file; omits live /contact, /terms, /waitlist routes.
   * Meta robots status: global index,follow in layout and per-page metadata generator (`src/app/layout.tsx (line 74)`, `src/lib/metadata.ts (line 42)`).
   * noindex usage: no route passes noIndex: true (only default false path exists in generator, `src/lib/metadata.ts (line 19)`); non-prod sends X-Robots-Tag: noindex, nofollow (`next.config.js (line 28)`).
3. Page Metadata Coverage (table)

| Route                  | Title                                                                | Description                                                                          | OG  | Twitter | Canonical | Structured Data  | Notes                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --- | ------- | --------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /                      | The AI Operating System for Governed Memory and Controlled Execution | Cosmocrat is the AI Operating System for governed memory and controlled execution... | Yes | Yes     | Yes       | Global graph     | Metadata from `src/app/page.tsx (line 6)`; global schema in `src/app/layout.tsx (line 82)`          |
| /about                 | About                                                                | Cosmocrat is the AI Operating System for governed memory and controlled execution... | Yes | Yes     | Yes       | Global graph     | `src/app/about/page.tsx (line 5)`                                                                                                                                                                                                                      |
| /docs                  | Documentation                                                        | Cosmocrat documentation covers architecture, APIs, and operational doctrine...       | Yes | Yes     | Yes       | Global graph     | `src/app/docs/page.tsx (line 5)`                                                                                                                                                                                                                       |
| /contact               | Contact                                                              | Get in touch with the Cosmocrat team...                                              | Yes | Yes     | Yes       | Global graph     | `src/app/contact/page.tsx (line 5)`; missing from sitemap list                                                                                                                                                                                         |
| /privacy               | Privacy Policy                                                       | Cosmocrat acts as a data processor for governance metadata...                        | Yes | Yes     | Yes       | Global graph     | `src/app/privacy/page.tsx (line 4)`                                                                                                                                                                                                                    |
| /terms                 | Terms of Service                                                     | Terms of operation for the Cosmocrat Engine...                                       | Yes | Yes     | Yes       | Global graph     | `src/app/terms/page.tsx (line 4)`; missing from sitemap list                                                                                                                                                                                           |
| /platform              | Platform                                                             | Cosmocrat is an enterprise AI operating system...                                    | Yes | Yes     | Yes       | Global + WebPage | Metadata `src/app/platform/page.tsx (line 7)`; page schema `src/app/platform/page.tsx (line 26)`      |
| /runtime-governance    | Runtime Governance                                                   | Prevent unauthorized AI execution...                                                 | Yes | Yes     | Yes       | Global + WebPage | `src/app/runtime-governance/page.tsx (line 6)`, `src/app/runtime-governance/page.tsx (line 25)`       |
| /gate-system           | Gate System                                                          | A deterministic enforcement pipeline...                                              | Yes | Yes     | Yes       | Global + WebPage | `src/app/gate-system/page.tsx (line 6)`, `src/app/gate-system/page.tsx (line 25)`                     |
| /decision-exhaust      | Decision Exhaust                                                     | Capture the "why" behind every AI action...                                          | Yes | Yes     | Yes       | Global + WebPage | `src/app/decision-exhaust/page.tsx (line 6)`, `src/app/decision-exhaust/page.tsx (line 25)`           |
| /drift-guard           | Drift Guard                                                          | Detect behavioral and policy divergence...                                           | Yes | Yes     | Yes       | Global + WebPage | `src/app/drift-guard/page.tsx (line 6)`, `src/app/drift-guard/page.tsx (line 25)`                     |
| /chronicle-receipts    | Chronicle Receipts                                                   | Cryptographic evidence of AI authorization...                                        | Yes | Yes     | Yes       | Global + WebPage | `src/app/chronicle-receipts/page.tsx (line 6)`, `src/app/chronicle-receipts/page.tsx (line 25)`       |
| /memory-infrastructure | Memory Infrastructure                                                | Treat AI memory as a managed resource...                                             | Yes | Yes     | Yes       | Global + WebPage | `src/app/memory-infrastructure/page.tsx (line 6)`, `src/app/memory-infrastructure/page.tsx (line 25)` |
| /waitlist              | Request Early Access                                                 | Request early access to Cosmocrat...                                                 | Yes | Yes     | Yes       | Global graph     | `src/app/waitlist/page.tsx (line 4)`; missing from sitemap list                                                                                                                                                                                        |
| /documentation         | N/A                                                                  | N/A                                                                                  | N/A | N/A     | N/A       | N/A              | No route found; /docs exists                                                                                                                                                                                                                                                                                                                                                                           |

4. OpenGraph/Twitter Audit
   * OG/Twitter are defined globally and in shared page metadata generator (`src/app/layout.tsx (line 59)`, `src/lib/metadata.ts (line 28)`, `src/lib/metadata.ts (line 36)`).
   * OG image source is single global `/og.png` (`src/lib/siteConfig.ts (line 11)`), reused across all routes.
   * OG image files exist: `public/og.png` (1200x630) and `public/decision-exhaust/og.png` (1200x630), but only `/og.png` is referenced in metadata.
   * Absolute URL behavior is inferred through metadataBase (`src/app/layout.tsx (line 40)`) plus relative OG path in config (`src/lib/siteConfig.ts (line 11)`).
   * Duplicate strategy: all pages share same OG/Twitter image and similar card setup (summary_large_image, `src/lib/metadata.ts (line 37)`).
5. Canonical & URL Hygiene
   * Base URL source is env-driven for runtime URL fields (`src/lib/siteConfig.ts (line 7)`).
   * Canonical URL is hardcoded to https://www.cosmocrat.ai (`src/lib/metadata.ts (line 22)`), not derived from env source.
   * metadataBase is also hardcoded to https://www.cosmocrat.ai (`src/app/layout.tsx (line 40)`).
   * .env.example uses non-www canonical example (`.env.example (line 5)`), creating potential host inconsistency with hardcoded www.
   * No explicit www/non-www or http->https redirect logic is configured in `next.config.js` (`next.config.js (line 2)`).
6. JSON-LD Audit
   * Global JSON-LD graph in layout includes Organization, WebSite, and SoftwareApplication (`src/app/layout.tsx (line 89)`, `src/app/layout.tsx (line 113)`, `src/app/layout.tsx (line 122)`).
   * Feature routes add per-page WebPage JSON-LD via generateFeatureSchema (`src/lib/schemas.ts (line 19)`, `src/app/gate-system/page.tsx (line 25)`).
   * Brand/entity naming: primary org is Cosmocrat (`src/lib/siteConfig.ts (line 6)`), with parentOrganization = Orion Apex Capital (`src/lib/siteConfig.ts (line 31)`).
   * Founder linkage is consistent across schema and visible content (`src/app/layout.tsx (line 98)`, `src/lib/siteConfig.ts (line 22)`, `src/app/about/page.tsx (line 115)`, `src/components/v1/Footer.tsx (line 97)`).
   * sameAs links exist for org/founder/parent org (`src/lib/siteConfig.ts (line 15)`, `src/lib/siteConfig.ts (line 24)`, `src/lib/siteConfig.ts (line 33)`).
   * Note: feature JSON-LD uses afterInteractive, which delays injection (`src/app/platform/page.tsx (line 28)`).
7. On-page Structure Quick Scan
   * H1 uniqueness: each marketing route has one primary H1 (examples: / in `src/components/v1/Hero.tsx (line 19)`, /about in `src/app/about/page.tsx (line 17)`, /platform in `src/app/platform/page.tsx (line 34)`, feature pages in their content components like `src/components/v1/pages/RuntimeGovernanceContent.tsx (line 79)`).
   * Heading order concerns: docs/privacy/terms go from H1 to H3 without H2 (`src/app/docs/page.tsx (line 19)`, `src/app/docs/page.tsx (line 39)`, `src/app/privacy/page.tsx (line 17)`, `src/app/privacy/page.tsx (line 32)`, `src/app/terms/page.tsx (line 16)`, `src/app/terms/page.tsx (line 31)`).
   * Duplicate metadata titles: none found across routed marketing pages.
   * Missing alt on images: none found for <img> usages (`src/components/v1/Header.tsx (line 29)`, `src/components/v1/Header.tsx (line 31)`, `src/components/v1/Footer.tsx (line 29)`, `src/components/v1/Footer.tsx (line 31)`, `src/app/about/page.tsx (line 109)`, `src/app/about/page.tsx (line 111)`).
8. Tech SEO & Performance Notes
   * Font strategy uses next/font/google with display: 'swap' for three families (`src/app/layout.tsx (line 3)`, `src/app/layout.tsx (line 14)`, `src/app/layout.tsx (line 20)`, `src/app/layout.tsx (line 26)`).
   * No next/image usage found for content/logo images; standard <img> is used for key visuals (`src/components/v1/Header.tsx (line 29)`, `src/components/v1/Footer.tsx (line 29)`, `src/app/about/page.tsx (line 109)`).
   * Modern format usage is mixed: profile photo is .webp (`src/app/about/page.tsx (line 110)`), logos are remote PNG.
   * No cache-control tuning is visible in app headers (only security/robots-related headers in `next.config.js (line 10)` and `next.config.js (line 28)`).
   * Manifest exists and is linked (`src/app/layout.tsx (line 41)`, `public/site.webmanifest (line 1)`), but minimal fields only.
9. Findings (Prioritized)

P0 (must-fix)

* Sitemap integrity mismatch: includes non-existent /request-access and omits live /contact, /terms, /waitlist pages. Refs: `src/app/sitemap.ts (line 20)`, `src/app/sitemap.ts (line 8)`, `src/app/contact/page.tsx (line 9)`, `src/app/terms/page.tsx (line 7)`, `src/app/waitlist/page.tsx (line 8)`.
* Indexability can fail hard if production env flags are not set exactly: robots and header noindex logic depend on VERCEL_ENV==='production' or SITE_STAGE==='prd'. Refs: `src/app/robots.ts (line 5)`, `src/app/robots.ts (line 11)`, `next.config.js (line 20)`, `next.config.js (line 28)`.

P1

* Canonical/OG/schema URL authority is inconsistent (www hardcoded vs env-driven URL source). Refs: `src/lib/siteConfig.ts (line 7)`, `src/lib/metadata.ts (line 22)`, `src/app/layout.tsx (line 40)`, `.env.example (line 5)`.
* Feature JSON-LD is injected client-side afterInteractive instead of being guaranteed in initial HTML. Refs: `src/app/platform/page.tsx (line 28)`, `src/app/runtime-governance/page.tsx (line 27)`, `src/app/gate-system/page.tsx (line 27)`.
* Key marketing images are unoptimized <img> rather than next/image (LCP/CLS opportunity). Refs: `src/components/v1/Header.tsx (line 29)`, `src/components/v1/Footer.tsx (line 29)`, `src/app/about/page.tsx (line 109)`.

P2

* Heading hierarchy skips H2 on docs/legal pages (H1 → H3). Refs: `src/app/docs/page.tsx (line 19)`, `src/app/docs/page.tsx (line 39)`, `src/app/privacy/page.tsx (line 17)`, `src/app/privacy/page.tsx (line 32)`, `src/app/terms/page.tsx (line 16)`, `src/app/terms/page.tsx (line 31)`.
* Manifest is minimal and lacks common fields like start_url/scope. Refs: `public/site.webmanifest (line 1)`, `public/site.webmanifest (line 18)`.
* Security headers include basic protections but no CSP/HSTS in app config. Refs: `next.config.js (line 10)`, `next.config.js (line 13)`.
10. Suggested Fix Plan (no code)
* Update `src/app/sitemap.ts` publicPages to remove /request-access and add /contact, /terms, /waitlist; alternatively add a real /request-access route or redirect if intentional.
* Normalize one canonical origin source in `src/lib/siteConfig.ts` and reuse it for canonical, metadataBase, sitemap URLs, and robots sitemap URL (`src/lib/metadata.ts`, `src/app/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`).
* Harden production-indexing guardrails: make crawlability logic explicit per deployment target and fail loudly when env is ambiguous (`src/app/robots.ts`, `next.config.js`).
* Render feature JSON-LD in initial HTML (server-rendered script or metadata-native pattern) for `src/app/platform/page.tsx` and the six feature route files.
* Replace key <img> tags with next/image and include explicit dimensions where appropriate (`src/components/v1/Header.tsx`, `src/components/v1/Footer.tsx`, `src/app/about/page.tsx`).
* Improve heading semantics in docs/legal pages by introducing H2 section wrappers before H3 blocks (`src/app/docs/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`).
* Expand `public/site.webmanifest` with start_url and scope, and validate final manifest/favicon set against current icon references.
  
  

GPT-5.3-Codex

IDE context

LocalF
