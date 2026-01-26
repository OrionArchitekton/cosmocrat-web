* * *

`cosmocrat-web`

**Marketing & Authority Surface for Cosmocrat (cosmocrat.ai)**Landing, pillar pages, and controlled early-access intake for the **AI Operating System for Governed Memory and Controlled Execution**.

This repository **does not contain the Cosmocrat kernel or execution engine**.It exists to communicate, define, and qualify access to the system.

* * *

Purpose of this Repository

This repo serves three roles:

1. **Category Definition**
  
  * Establishes _Governed AI Operating Systems_ as a first-class category
    
  * Publishes canonical explanations (Runtime Governance, Gate System, Decision Exhaust, Drift Guard, Chronicle Receipts, Memory as Infrastructure)
    
2. **Authority Surface**
  
  * Teaches search engines, operators, and buyers _what Cosmocrat is_ (and is not)
    
  * Reinforces runtime governance, authority, receipts, and fail-closed semantics
    
3. **Early Access Intake**
  
  * Collects and qualifies requests for pilot deployments
    
  * Routes serious teams into manual onboarding
    

This repo is intentionally **content-forward, stable, and slow-changing**.

* * *

What This Repo Is **Not**

* ❌ Not the Cosmocrat kernel
  
* ❌ Not an agent framework
  
* ❌ Not an AI model or inference stack
  
* ❌ Not a playground or demo environment
  
* ❌ Not a pricing or sales funnel
  

Those concerns live elsewhere (`cosmocrat-core`, operator repos, or private infra).

* * *

Stack Overview

* **Framework:** Next.js (App Router)
  
* **Hosting:** Vercel
  
* **Secrets:** Doppler (single source of truth)
  
* **Database:** Supabase (early access intake only)
  
* **Email:** Resend (notifications + confirmations)
  

* * *

Local Development

### Requirements

* Node.js 18+ (20 recommended)
  
* npm
  
* Doppler CLI
  
* Supabase project
  
* Resend API key
  

### Install Doppler

    brew install dopplerhq/cli
    # or see https://docs.doppler.com/docs/install-cli

### Login & Select Project

    doppler login
    doppler setup   # select cosmocrat-web + config (dev/stg/prd)

### Run Locally

    npm install
    doppler run --config dev -- npm run dev

Open: [http://localhost:3000](http://localhost:3000/)

* * *

Environment Variables (Doppler)

Doppler is the **only** source of truth.`.env` files are local fallback only.

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL (e.g. [https://www.cosmocrat.ai](https://www.cosmocrat.ai/)) |
| `SITE_STAGE` | `dev`, `stg`, or `prd` |
| `CONTACT_EMAIL` | Public contact address |
| `DOCS_URL` | Optional external docs URL (if enabled) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only insert key |
| `RESEND_API_KEY` | Email provider key |
| `RESEND_FROM_EMAIL` | Verified sender |
| `WAITLIST_NOTIFY_EMAIL` | Internal notification target |
| `IP_HASH_SALT` | Salt for hashing IPs (privacy) |

⚠️ **Never expose `SUPABASE_SERVICE_ROLE_KEY` client-side.**

* * *

Supabase Schema (Early Access)

This repo only writes **governance-safe metadata**, not AI payloads. create table if not exists public.waitlist_signups ( id uuid primary key default gen_random_uuid(), email text not null, email_norm text not null, name text, message text, source text default 'cosmocrat.ai', landing_path text, referrer text, utm_source text, utm_medium text, utm_campaign text, utm_content text, utm_term text, user_agent text, ip_hash text, created_at timestamptz not null default now() ); create unique index if not exists waitlist_signups_email_norm_unique on public.waitlist_signups (email_norm);

### Behavior

* Idempotent by `email_norm`
  
* Raw IPs never stored (hash only)
  
* No prompt, decision, or model data stored
  

* * *

Email Behavior (Resend)

Used for:

* Internal notification on new early-access request
  
* Optional confirmation to submitter
  

If using `contact@cosmocrat.ai`:

* Domain **must** be verified in Resend

* * *

Canonical Pages (Do Not Rename Lightly)

These pages define the category and are referenced by search synthesis:

* `/about` — Entity & definition
  
* `/runtime-governance`
  
* `/gate-system`
  
* `/decision-exhaust`
  
* `/drift-guard`
  
* `/chronicle-receipts`
  
* `/memory-infrastructure`
  
* `/docs` — gated access explanation
  
* `/request-access`
  

Renaming, merging, or deleting these pages will reset indexing.

* * *

SEO & Indexing Guardrails

This site intentionally uses **layered content**:

* **Hero:** Minimal, decisive
  
* **Narrative:** Visual + short text
  
* **SEO spine:** Text-forward sections & FAQs
  

Rules:

* Always keep real text in the DOM
  
* Never replace explanation with video only
  
* Avoid frequent copy churn during indexing windows
  
* Maintain consistent terminology across all pages
  

* * *

Deployment (Vercel)

### One-Time Setup

1. Import repo into Vercel
  
2. Install Doppler Vercel integration
  
3. Link Doppler project + config
  
4. Set production domain
  
5. Deploy
  

### Pre-Deploy Checklist

* Canonical URL correct
  
* JSON-LD present (Organization, WebSite, SoftwareApplication)
  
* Footer links wired correctly
  
* Robots + sitemap configured intentionally
  

* * *

Governance Alignment

This repo must **match Cosmocrat doctrine**:

* Fail-closed semantics
  
* Authority before execution
  
* Receipts as evidence, not logs
  
* Memory admissibility ≠ existence
  
* Governance is infrastructure, not policy
  

If copy conflicts with system behavior, **system behavior wins**.

* * *

License & Ownership

© Orion Apex Capital.All rights reserved.

* * *
