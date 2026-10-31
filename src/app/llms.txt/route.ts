import { siteConfig } from '@/lib/siteConfig';
import { tools } from '@/lib/toolCatalog';

export const dynamic = 'force-static';
const base = siteConfig.origin;
const content = `# Cosmocrat OS

> Tools and operating practices for coordinating agents, carrying context between sessions, and verifying work under human direction.

## Identity and scope

- Cosmocrat OS is the project and tool-family identity.
- Orion Estate is the private operating environment that informs the work.
- The independently versioned Orion components keep their names, licenses and support boundaries.
- Family membership does not establish kernel integration, private runtime adoption or non-bypassable enforcement.
- Starter combinations remain previews. There is no complete OS installer or universal platform support promise.
- The private Cosmocrat governance kernel retains policy, authority and authoritative decision-receipt responsibilities. It does not execute business workflows.
- Local records and admission receipts do not by themselves establish an external outcome.

## Principles

Human sovereignty; memory as infrastructure; explicit context boundaries; trust supported by inspectable evidence; recoverable, reliable work.

## Entity

- Project / Organization: Cosmocrat
- Parent organization: Orion Apex Capital (OAC)
- Founder and systems architect: Dan Mercede
- Guides and videos retain their existing canonical homes at danmercede.com and the creator's channels.

## Available tools and profiles

${tools.map((tool) => `- ${tool.name}: ${tool.version}; ${tool.status}. ${base}/tools#${tool.id}`).join('\n')}

The continuity guide remains pinned to Starter 0.2.0-rc.1. The development-evidence guide teaches 0.3.0-rc.1. Public Remote Hands is experimental and start-only; the private estate implementation is separate.

## Primary pages

${['/', '/tools', '/about', '/docs', '/platform', '/runtime-governance', '/gate-system', '/decision-exhaust', '/drift-guard', '/chronicle-receipts', '/memory-infrastructure', '/contact', '/privacy', '/terms'].map((path) => `- ${base}${path}`).join('\n')}

## Architecture references

The governance topic pages describe design and integration boundaries. They are not evidence that every public tool implements the complete architecture. Use each named release, guide version and support contract for availability claims.

## Crawling guidance

Follow robots.txt, sitemap.xml, canonical URLs and structured data. No rights are granted for private, gated, API, customer, operational or non-public material.`;

export function GET() {
  return new Response(content, { headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
  } });
}
