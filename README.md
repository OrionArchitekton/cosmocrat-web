# cosmocrat-web

Marketing and authority surface for Cosmocrat ([cosmocrat.ai](https://www.cosmocrat.ai)) — landing, pillar pages, and early-access intake.

This repository does not contain the Cosmocrat kernel or execution engine. It exists to communicate, define, and qualify access to the system.

**Live:** https://www.cosmocrat.ai

---

## Purpose of this repository

This repo serves three roles:

1. **Category definition** — establishes *Governed AI Operating Systems* as a first-class category and publishes canonical explanations (Runtime Governance, Gate System, Decision Exhaust, Drift Guard, Chronicle Receipts, Memory as Infrastructure).
2. **Authority surface** — teaches search engines, operators, and buyers what Cosmocrat is and is not, reinforcing runtime governance, authority, receipts, and fail-closed semantics.
3. **Early-access intake** — collects and qualifies requests for pilot deployments at `/waitlist` and routes serious teams into manual onboarding.

This repo is intentionally content-forward, stable, and slow-changing.

---

## What this repo is not

- Not the Cosmocrat kernel
- Not an agent framework
- Not an AI model or inference stack
- Not a playground or demo environment
- Not a pricing or sales funnel

Those concerns live in their own canonical homes:

- governance kernel: `cosmocrat-kernel`
- shared execution substrate: `orion-runtime`
- shared deploy / infra packaging: `orion-infra`
- GTM workflow truth: `cosmocrat-gtm-engine`

This repo is the public web surface only.

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6, React 18.2
- **Styling:** Tailwind CSS 3.4 + `@tailwindcss/typography`
- **Validation:** Zod 3
- **Database:** Supabase (early-access intake only)
- **Email:** Resend (confirmation + internal notification)
- **Icons:** lucide-react
- **Hosting:** Vercel
- **Secrets:** Doppler (single source of truth)

---

## Local development

### Requirements

- Node.js 20 (18+ works; CI runs on 20)
- npm
- Doppler CLI (or a local `.env` for the fallback path)
- Supabase project + Resend API key for the waitlist flow

### Install Doppler

```bash
brew install dopplerhq/cli
# or see https://docs.doppler.com/docs/install-cli
```

### Login and select project

```bash
doppler login
doppler setup   # select cosmocrat-web + config (the repo pins project=cosmocrat-web, config=dev via doppler.yaml)
```

### Run locally

```bash
npm install
doppler run --config dev -- npm run dev
```

`SITE_ENV` is required at build/dev time (see Environment variables). Without Doppler, set it inline:

```bash
SITE_ENV=staging npm run dev
```

Open: http://localhost:3000

### Other commands

```bash
npm run build       # next build (requires a valid SITE_ENV)
npm run start       # next start
npm run lint        # next lint (ESLint)
npm run typecheck   # tsc --noEmit
npm run format      # prettier --write .
bash scripts/verify.sh   # install + lint + typecheck + best-effort build (nightly entrypoint)
```

---

## Environment variables

Doppler is the source of truth in production. `.env` files are a local fallback only — see `.env.example` for the full list with placeholders. Never commit real values.

| Variable | Required | Description |
| --- | --- | --- |
| `SITE_ENV` | yes | One of `development`, `staging`, `production`. Build fails closed if missing/invalid. |
| `NEXT_PUBLIC_SITE_URL` | prod | Canonical origin. In production must be exactly `https://www.cosmocrat.ai`. |
| `CONTACT_EMAIL` | optional | Public contact address; also a fallback sender/reply-to. |
| `SUPABASE_URL` | waitlist | Supabase project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | waitlist | Server-only insert key. Never expose client-side. |
| `RESEND_API_KEY` | waitlist | Resend key. If absent, signup still succeeds but no email is sent. |
| `RESEND_FROM_EMAIL` | waitlist | Verified sender (falls back to `CONTACT_EMAIL`). |
| `RESEND_REPLY_TO` | optional | Reply-to address (falls back to `CONTACT_EMAIL`). |
| `WAITLIST_NOTIFY_EMAIL` | optional | Internal notification target for new requests. |
| `IP_HASH_SALT` | waitlist | Salt for hashing submitter IPs (privacy). |
| `COSMOCRAT_INGEST_URL` | optional | Base URL of the Cosmocrat ingest API for Hub lead forwarding (see Integrations). |
| `COSMOCRAT_INGEST_TOKEN` | optional | Bearer token for the ingest forward. |
| `SITE_STAGE` | optional | Legacy stage flag. Non-authoritative for SEO/indexing decisions. |

> `DOCS_URL` appears in `.env.example` but is not currently read by any code; leave it blank unless a consumer is added.

Build is fail-closed on `SITE_ENV` (`next.config.js`). When `SITE_ENV=production`, the build also fails unless `NEXT_PUBLIC_SITE_URL` is exactly `https://www.cosmocrat.ai` (https, host `www.cosmocrat.ai`, no path/query/port).

---

## Waitlist intake

`POST /api/waitlist` (`src/app/api/waitlist/route.ts`) is the only server route with side effects. It:

1. Validates the body with Zod (`src/lib/waitlist.ts`). `email`, `company`, and `role` are required; `name`, `ai_system`, `first_run`, UTM fields, `referrer`, and `landing_path` are optional.
2. Drops bot submissions via a honeypot field (`website`) — if filled, the API silently returns `{ ok: true }` and does nothing.
3. Hashes the submitter IP with `IP_HASH_SALT` (raw IPs are never stored).
4. Inserts a row into the Supabase `waitlist_signups` table, idempotent on `email_norm` (a duplicate is treated as success, not an error).
5. For new (non-duplicate) leads, forwards to the Cosmocrat ingest API (see Integrations) and sends a confirmation email plus an internal notification via Resend. Email and ingest failures never fail the signup.

### Supabase schema (early access)

This repo writes governance-safe lead metadata only — no prompt, decision, or model data.

```sql
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_norm text not null,
  name text,
  company text not null,
  role text not null,
  ai_system text,
  first_run text,
  source text default 'cosmocrat_web_v1',
  landing_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  user_agent text,
  ip_hash text,
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_norm_unique
  on public.waitlist_signups (email_norm);
```

Behavior:

- Idempotent by `email_norm` (unique violation = duplicate, not failure).
- Raw IPs never stored (hash only).
- No prompt, decision, or model data stored.

---

## Integrations

### Resend (email)

Sends a confirmation to the submitter and an internal notification to `WAITLIST_NOTIFY_EMAIL` on each new request. The from/reply-to addresses fall back to `CONTACT_EMAIL`. If the sending domain is `cosmocrat.ai`, it must be verified in Resend.

### Cosmocrat ingest forward (optional)

When both `COSMOCRAT_INGEST_URL` and `COSMOCRAT_INGEST_TOKEN` are set, each new lead is forwarded to `${COSMOCRAT_INGEST_URL}/api/tenants/cosmocrat/leads` with a bearer token so the lead becomes visible in Hub. This forward is **fail-open**: any error is swallowed and never degrades the signup. Leave both unset to disable forwarding entirely.

---

## Canonical pages

These pages define the category and are referenced by search synthesis. Renaming, merging, or deleting them resets indexing.

- `/about` — entity and definition
- `/platform`
- `/runtime-governance`
- `/gate-system`
- `/decision-exhaust`
- `/drift-guard`
- `/chronicle-receipts`
- `/memory-infrastructure`
- `/docs` — gated-access explanation
- `/waitlist` — early-access intake

The full indexed set is enumerated in `src/app/sitemap.ts`.

---

## SEO and indexing guardrails

The site uses layered content:

- **Hero:** minimal, decisive
- **Narrative:** visual + short text
- **SEO spine:** text-forward sections and FAQs

Rules:

- Always keep real text in the DOM.
- Never replace explanation with video only.
- Avoid frequent copy churn during indexing windows.
- Maintain consistent terminology across all pages.

Indexing controls are enforced in code: `next.config.js` permanently redirects the bare host `cosmocrat.ai` to `https://www.cosmocrat.ai`, sets security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`), and adds `X-Robots-Tag: noindex, nofollow` on all non-production environments. `robots.ts` disallows `/api/` in production. Remote images are restricted to `storage.googleapis.com/cosmocrat/**`.

---

## Project structure

```
src/
  app/                      # App Router routes (one dir per page) + api/waitlist/route.ts
    layout.tsx, page.tsx    # Root layout + landing
    sitemap.ts, robots.ts   # SEO surface
  components/v1/            # Header, Footer, Hero, WaitlistForm, SEO spine, pillar page content
  lib/                      # supabaseAdmin, resendClient, waitlist, schemas, siteConfig, metadata
  styles/                   # Tailwind globals
next.config.js              # SITE_ENV fail-closed guard, host redirect, security headers
vercel.json                 # Build command (maps preview/dev VERCEL_ENV to a valid SITE_ENV)
doppler.yaml                # Pins Doppler project/config
scripts/verify.sh|.ps1      # Local verification entrypoints
```

---

## Deployment (Vercel)

Hosted on Vercel; the build command lives in `vercel.json` and normalizes `VERCEL_ENV` (`preview`/`development`) into a valid `SITE_ENV` before running `npm run build`.

One-time setup:

1. Import the repo into Vercel.
2. Install the Doppler Vercel integration and link project + config.
3. Set the production domain to `www.cosmocrat.ai`.
4. Deploy.

Pre-deploy checklist:

- Canonical URL correct (`NEXT_PUBLIC_SITE_URL=https://www.cosmocrat.ai` in production).
- JSON-LD present (Organization, WebSite, SoftwareApplication).
- Footer links wired correctly.
- Robots + sitemap configured intentionally.

---

## CI / verification

- `.github/workflows/ci.yml` runs typecheck, lint, and build on every PR and on push to `main` (Node 20, `SITE_ENV=staging`).
- `gitleaks-scan.yml` and `required-checks-fail-closed.yml` gate the repo.
- `scripts/verify.sh` (and `verify.ps1`) run install + lint + typecheck + best-effort build locally.

After deploy:

```bash
curl -I https://cosmocrat.ai/                         # expect 308 permanent redirect to www
curl -I https://www.cosmocrat.ai/ | grep -i robots    # expect empty on prod
curl https://www.cosmocrat.ai/robots.txt
curl https://www.cosmocrat.ai/sitemap.xml | head
```

---

## Governance alignment

This repo must match Cosmocrat doctrine:

- Fail-closed semantics
- Authority before execution
- Receipts as evidence, not logs
- Memory admissibility ≠ existence
- Governance is infrastructure, not policy

If copy conflicts with system behavior, system behavior wins.

---

## License

© Orion Apex Capital. All rights reserved. This is a public repository with no open-source grant; the source is published for transparency, not reuse. (No `LICENSE` file is currently committed — see the open question for maintainers.)
