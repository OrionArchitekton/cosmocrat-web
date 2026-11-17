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
- Existing walkthroughs and videos retain their canonical homes at danmercede.com and the creator's channels. The field notes below are original to cosmocrat.ai.

## Available tools and profiles

${tools.map((tool) => `- ${tool.name}: ${tool.version}; ${tool.status}. ${base}/tools#${tool.id}`).join('\n')}

The continuity guide remains pinned to Starter 0.2.0-rc.1. The development-evidence guide teaches 0.3.0-rc.1. Public Remote Hands is experimental and start-only; the private estate implementation is separate.

## Primary pages

${['/', '/tools', '/about', '/docs', '/platform', '/runtime-governance', '/gate-system', '/decision-exhaust', '/drift-guard', '/chronicle-receipts', '/memory-infrastructure', '/contact', '/privacy', '/terms', '/waitlist'].map((path) => `- ${base}${path}`).join('\n')}

## Architecture references

The governance topic pages describe design and integration boundaries. They are not evidence that every public tool implements the complete architecture. Use each named release, guide version and support contract for availability claims.

- Memory infrastructure: admissibility determines which retained context may influence a governed decision. ${base}/memory-infrastructure
- Decision exhaust: inspect the policy, authority and state references behind a decision. ${base}/decision-exhaust
- Runtime governance: admission happens at a named integration boundary before a governed mutation. ${base}/runtime-governance
- Gate system: intent, evidence, authority, execution and outcome have separate roles. ${base}/gate-system
- Chronicle receipts: authoritative decision records have explicit integrity and replay boundaries. An external outcome requires its own evidence. ${base}/chronicle-receipts
- Drift guard: compare later observations against a specified baseline and report within the coverage of the check. ${base}/drift-guard

## Starting paths and field notes

- Interactive starting paths: choose task ownership (PM v0.1.1), the continuity preview (Starter 0.2.0-rc.1), the development-evidence preview (Starter 0.3.0-rc.1), or governance design. ${base}/docs#starting-paths
- Find a tool by task, then check its release, environment and support boundary. ${base}/tools
- Agent handoff pattern: identify the task, retrieve the original observation and recheck the current state. ${base}/guides/agent-handoff-pattern
- Preventing worktree collisions: interpret overlap and coverage separately before assigning edits. ${base}/guides/preventing-worktree-collisions
- Website changelog: selected merged public-site changes and their source pull requests. ${base}/changelog

## Crawling guidance

Follow robots.txt, sitemap.xml, canonical URLs and structured data. No rights are granted for private, gated, API, customer, operational or non-public material.`;

export function GET() {
  return new Response(content, { headers: {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
  } });
}
