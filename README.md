# cosmocrat.ai

Marketing site for **Cosmocrat** (landing + waitlist + docs link). No pricing page yet.

## Secrets Management

**Doppler is the single source of truth for all secrets.** `.env` files are local-only fallback.

### Setup Doppler

```bash
# Install Doppler CLI
# See: https://docs.doppler.com/docs/install-cli

# Login and setup project
doppler login
doppler setup  # Select cosmocrat-web project
```

### Local Development

```bash
npm install
doppler run --config dev -- npm run dev
```

Open http://localhost:3000

### Environment Variables (add to Doppler)

| Secret | Description | Default |
|--------|-------------|---------|
| NEXT_PUBLIC_SITE_URL | Canonical site URL | https://cosmocrat.ai |
| SITE_STAGE | `coming_soon` or `live` | coming_soon |
| CONTACT_EMAIL | Footer/header mailto | contact@cosmocrat.ai |
| DOCS_URL | External docs URL (optional) | |
| SUPABASE_URL | Supabase project URL | |
| SUPABASE_SERVICE_ROLE_KEY | Server-only service role key | |
| RESEND_API_KEY | Resend API key | |
| RESEND_FROM_EMAIL | Email sender address | contact@cosmocrat.ai |
| RESEND_REPLY_TO | Reply-to header | contact@cosmocrat.ai |
| WAITLIST_NOTIFY_EMAIL | Internal notification recipient | |
| IP_HASH_SALT | Salt for hashing IPs (privacy) | |

## Supabase Schema

Create a table named `waitlist_signups` in the cosmocrat Supabase project:

```sql
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  email_norm text not null,
  name text,
  source text default 'cosmocrat.ai',
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

create index if not exists waitlist_signups_created_at_idx
  on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;
```

Notes:
- The API uses the Supabase **service role key** (server-only) to insert rows.
- Duplicate emails (by `email_norm`) are treated as an idempotent success.
- `email` stores the original input, `email_norm` stores the normalized (lowercase) version.

## Resend Notes

If you use `contact@cosmocrat.ai` as the sender, you must verify the domain in Resend.

## Deploy to Vercel

1. Create GitHub repo `cosmocrat-web` (OrionArchitekton org)
2. Push code to `main`
3. Import to Vercel
4. Install Doppler Vercel integration at vercel.com/integrations/doppler
5. Link to `cosmocrat-web` project, `prd` config
6. Deploy

Secrets sync automatically from Doppler to Vercel.

## Design System

This site uses the same design tokens as `chat.orionbot.online` for future integration:

- **Colors**: Navy-900 (#0D1B2A), Navy-800 (#14273A), Copper (#B87654), Cosmos Blue (#0c8ee9)
- **Fonts**: Inter (body), Orbitron (headings), JetBrains Mono (code)
