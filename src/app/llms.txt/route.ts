import { siteConfig } from '@/lib/siteConfig';

export const dynamic = 'force-static';

const base = siteConfig.origin;

const content = `# Cosmocrat

> Cosmocrat is the enterprise AI operating system that governs what AI is allowed to do, when it must stop, and who authorized it — turning AI execution into an auditable, accountable, and fail-closed asset.

## Canonical Site

- ${base}

## Category

- Enterprise AI Operating System / Control Plane
- Cosmocrat is a runtime governance control plane that governs AI execution: it decides what AI is allowed to do, when it must stop, and who authorized it. Cosmocrat governs AI; it is not the AI.

## Entity

- Product / Organization: Cosmocrat
- Parent organization: Orion Apex Capital (OAC)
- Founder and systems architect: Dan Mercede

## What Cosmocrat Does

- Decides whether an AI or human-initiated action is permitted, under what policy, and with what receipt-backed proof.
- Fails closed: execution halts when authority or policy cannot be satisfied.
- Records every decision as durable, tamper-evident evidence that can be replayed and audited.
- Governs memory as a controlled resource so context cannot bleed between isolated lanes.

## Value Pillars

- Provable Trust — receipts, replay, and audit defensibility.
- Fail-Closed Control — gates stop execution when authority is missing.
- Structural Accountability — lane isolation and governed memory; context cannot bleed.

## Primary Public Pages

- ${base}/
- ${base}/platform
- ${base}/about
- ${base}/runtime-governance
- ${base}/gate-system
- ${base}/decision-exhaust
- ${base}/drift-guard
- ${base}/chronicle-receipts
- ${base}/memory-infrastructure
- ${base}/contact
- ${base}/docs
- ${base}/waitlist
- ${base}/privacy
- ${base}/terms

## Crawling Guidance

Use canonical public pages, robots.txt, sitemap.xml, and structured data as the source of truth. No rights are granted for private, gated, API, customer, operational, or non-public material.`;

export function GET() {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
