# cosmocrat-web

@AGENTS.md

## Role

Public Cosmocrat business web surface under OAC. Marketing, authority content, and early-access intake for cosmocrat.ai. Business web duties stay here, not in platform/cosmocrat/*.

This repo does not contain the Cosmocrat kernel or execution engine.

## Build & Test

```bash
npm run dev          # Next.js dev server (requires SITE_ENV env var)
npm run build        # Production build
npm run lint         # ESLint (next lint)
npm run typecheck    # tsc --noEmit
npm run format       # Prettier
```

Secrets via Doppler (`cosmocrat-web` project, `dev` config). Required env vars: `SITE_ENV` (development|staging|production), `NEXT_PUBLIC_SITE_URL` (required in production, must be `https://www.cosmocrat.ai`).

## Architecture

Next.js 14 App Router, React 18, TypeScript, Tailwind CSS.

```
src/
  app/                      # App Router routes
    api/waitlist/route.ts   # Waitlist submission API (Supabase + Resend)
    about/                  # About page
    contact/                # Contact page
    waitlist/               # Waitlist page
    chronicle-receipts/     # Pillar content pages (authority SEO)
    decision-exhaust/
    drift-guard/
    gate-system/
    memory-infrastructure/
    runtime-governance/
    docs/                   # Docs section
    platform/               # Platform section
    privacy/                # Legal
    terms/
    layout.tsx              # Root layout
    page.tsx                # Landing page
  components/v1/            # UI components
    Header.tsx, Footer.tsx  # Site chrome
    Hero.tsx                # Landing hero
    WaitlistForm.tsx        # Waitlist intake form
    Narrative.tsx           # Content narrative block
    SeoSpine.tsx            # SEO spine component
    FaqItem.tsx             # FAQ accordion
    pages/                  # Pillar page content components
  lib/                      # Shared utilities
    supabaseAdmin.ts        # Supabase admin client
    resendClient.ts         # Resend email client
    waitlist.ts             # Waitlist logic
    waitlistEmail.ts        # Waitlist email templates
    schemas.ts              # Zod validation schemas
    siteConfig.ts           # Site configuration
    metadata.ts             # SEO metadata helpers
    requestMeta.ts          # Request metadata utils
  styles/
    globals.css             # Global Tailwind styles
```

## Key Integrations

- **Supabase**: Waitlist data persistence
- **Resend**: Transactional email (waitlist confirmation)
- **Zod**: Request validation schemas

## Conventions

- Pillar pages follow a consistent pattern: route directory + corresponding content component in `components/v1/pages/`
- Security headers enforced in `next.config.js` (nosniff, DENY framing, strict referrer, permissions policy)
- Non-production environments get `X-Robots-Tag: noindex, nofollow`
- Bare domain `cosmocrat.ai` redirects to `www.cosmocrat.ai`
