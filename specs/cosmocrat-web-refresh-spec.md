# Cosmocrat Web Refresh — Spec

**Status:** Implemented in this PR · **Scope:** marketing copy refresh to current product truth + a bounded AEO/SEO/GEO gap-fill · **Surface:** `src/app/`, `src/lib/`, `src/components/v1/`

## Why

The site copy was written when Cosmocrat was a single bundled system. The product
has since matured into a narrow governor-of-record kernel surrounded by a family of
governed surfaces, with execution moved to a separate runtime. This change makes the
public site (1) lead with the locked external category and (2) tell the current
product story — while closing a small set of structured-data gaps that the locked
AEO doctrine names.

## Constraints (the rails this change commits to)

1. **Locked messaging discipline.** Lead with the locked category — *Enterprise AI
   Operating System / Control Plane*. Use the three locked value pillars verbatim
   (Provable Trust · Fail-Closed Control · Structural Accountability) with no invented
   fourth pillar and no reworded pillar names. Reproduce the four competitive-contrast
   rails faithfully. Never use a Do-Not-Say term (notably "autonomous"/"autonomy",
   "plugin/feature/add-on", "guaranteed safe", spiritual/omniscient/surveillance
   framing). Never use a forbidden category framing ("agent platform", "framework",
   "ML model", "governance feature", unqualified "decision engine").
2. **Narrow-Core boundary.** Copy must not claim Cosmocrat performs execution,
   orchestration, or pipeline work — that belongs to the separate runtime. Transitional
   surfaces (memory-governance, governed-knowledge, operator plane) must not be marketed
   as shipped products. Anchor: *Cosmocrat governs AI; it is not the AI.*
3. **Positioning embargo.** No open-source / MIT / free-tier / standalone / OSS-wedge
   claims in public copy. Enterprise commercial framing (subscription, private early
   access) is allowed.
4. **AEO entity doctrine (shape).** A page-level `WebPage` node lives on the homepage
   only (via `page.tsx`), never in `RootLayout`. This site's own entity `@id`s are
   env-derived from `siteConfig.origin` so they resolve on preview deploys. Sitemap
   `lastModified` is a committed constant, never `new Date()`. No per-page Person/Org
   redefinition; the founder is referenced by canonical `@id`. `llms.txt` is served.
5. **Public-repo opsec.** No host paths, no personal email, no estate-tree paths, no
   secrets in committed files.

## Scenarios & acceptance criteria

### Copy

- **Homepage hero leads with the locked category + canonical sentence.**
  `src/components/v1/Hero.tsx` H1 leads with "The enterprise AI operating system that
  governs what AI is allowed to do"; the subhead carries the locked canonical sentence;
  the tertiary line is the locked tagline "Governance at runtime, not in retrospect."
- **Homepage pillar cards are the three locked pillars.**
  `src/components/v1/Narrative.tsx` renders exactly "Fail-Closed Control",
  "Structural Accountability", and "Provable Trust" — the locked set, no fourth.
- **Homepage carries the four competitive-contrast rails.** A contrast-rail strip in
  `Narrative.tsx` reproduces: Others observe→Cosmocrat enforces; Others log→Cosmocrat
  governs; Others fail-open→Cosmocrat fails-closed; Others sell agents→Cosmocrat governs
  agents.
- **The "Engine" card does not claim orchestration/execution.** The homepage
  "Cosmocrat Engine" description frames a deployable control plane (policy evaluation,
  governed memory, receipts), not orchestration.
- **No Do-Not-Say terms on the homepage.** `src/components/v1/SeoSpine.tsx` no longer
  uses "autonomously"/"controlled autonomy".
- **/about tells the divergence story.** `src/app/about/page.tsx` adds a "How Cosmocrat
  Is Built Today" section: narrow governor-of-record kernel, a family of governed
  surfaces, execution in a separate runtime that calls Cosmocrat before governed action,
  and the anchor "Cosmocrat governs AI; it is not the AI." Founder bio and the name
  disambiguation are retained.
- **/platform leads with the locked category** and retains the enterprise commercial
  model (no OSS claims). `src/app/platform/page.tsx`.
- **Legal dates refreshed.** `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`
  show "Last Updated: June 2026" (no other legal-content changes).
- **Pillar content pages unchanged.** The six `src/components/v1/pages/*Content.tsx`
  files are not rewritten (verified against the capability model, left intact). The
  "7-stage / G0–G6" gate-count claim is unchanged and consistent across all surfaces.

### AEO / SEO / GEO

- **`/llms.txt` returns 200, `text/plain`.** New route `src/app/llms.txt/route.ts`
  serves a canon-compliant entity document (leads with the locked category, the three
  pillars, IS/IS-NOT, canonical page list), env-derived from `siteConfig.origin`.
- **Sitemap uses a committed lastmod.** `src/app/sitemap.ts` defines
  `LAST_CONTENT_UPDATE` and no longer calls `new Date()`.
- **Homepage emits one WebPage node.** `src/app/page.tsx` renders a single homepage
  `WebPage` (`@id = ${origin}/#webpage`, env-derived) via `generateHomeWebPage()` in
  `src/lib/schemas.ts`. `RootLayout` (`src/app/layout.tsx`) emits no WebPage.
- **Founder referenced by `@id`.** `src/app/layout.tsx` references the founder Person by
  its canonical `@id` (`danmercede.com/#person`) without redefining its `sameAs`.
- **`sameAs` typo fixed.** `src/lib/siteConfig.ts` parent-organization LinkedIn handle is
  `orionapexcapital` (was `orioncapexcapital`).

### Verification

- `npm run typecheck`, `npm run lint`, and `npm run build` (with `SITE_ENV=staging`,
  matching CI) all exit 0; all routes — including `/llms.txt` — build.
- The built homepage HTML contains the WebPage `@id`, the locked category hero copy, the
  three pillars, and the corrected `orionapexcapital` handle; the built sitemap carries
  the committed `2026-06-21` lastmod.
- The PR's Vercel preview renders the new copy and JSON-LD.

## Out of scope (explicitly deferred)

- **Host-path leak scrub** of `AGENTS.md` / `docs/doctrine/COSMOCRAT_DOCTRINE_POINTER.md`
  (pre-existing; tracked as a separate decision — not addressed here).
- **identityGuard CI / vitest.** No test runner is introduced this round.
- **Full rewrite** of the six pillar content pages (they already align with the
  capability model).
- **Deeper legal-content review** beyond the date refresh.
