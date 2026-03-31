# Cosmocrat Web Agent Guide

## Repo Role

`cosmocrat-web` is the public web and authority surface for Cosmocrat.

Use it for:
- public site content and page structure
- authority-surface UX
- early-access intake and qualification flows
- SEO, metadata, structured data, and analytics-safe marketing plumbing
- tests and CI that protect the public web surface

Do not treat this repo as:
- the Cosmocrat governance kernel
- the shared execution substrate
- the deploy / infra packaging home
- the operator plane
- the GTM workflow-truth owner

## Authority Order

When editing this repo, follow authority in this order:

1. `/home/orion/src/orion-estate/platform/orion-estate-audit/AGENTS.md`
2. `/home/orion/src/orion-estate/platform/orion-estate-audit/ORION_ESTATE_MASTER_CONTRACT.md`
3. `/home/orion/src/orion-estate/platform/orion-estate-audit/estate_home_registry.yaml`
4. this repo's `README.md`
5. source, tests, and CI config in this repo

If repo copy drifts from estate doctrine, repair the copy. Do not widen this
repo to absorb ownership that belongs elsewhere.

## Boundary Rules

This repo owns only the public Cosmocrat web surface.

It may own:
- landing pages and authority content
- public explanations of Cosmocrat concepts
- early-access intake forms and server actions
- SEO, indexing, analytics-safe web instrumentation, and structured data
- web-only tests, build configuration, and Vercel-facing wiring

It must not own:
- kernel authority or mutation truth
- runtime substrate or orchestration logic
- infra packaging or shared deploy composition
- operator dashboards or operator control flows
- GTM workflow canon or GTM business logic

## Safe Change Envelope

Safe changes here include:
- page copy and content hierarchy
- page components, styling, and web UX
- intake, contact, and qualification plumbing
- SEO and metadata
- lint, typecheck, build, and repo-local CI hardening

Stop and escalate before changing:
- governance or receipt semantics
- runtime integration boundaries
- shared infra or secrets topology
- operator-plane behavior
- GTM workflow ownership or business-truth flows

## Validation

Use the supported local toolchain for verification:

```bash
PATH=/home/orion/.nvm/versions/node/v20.20.0/bin:$PATH npm ci
PATH=/home/orion/.nvm/versions/node/v20.20.0/bin:$PATH npm run lint
PATH=/home/orion/.nvm/versions/node/v20.20.0/bin:$PATH npm run typecheck
```

If a public-site check fails, fix the repo-local issue rather than weakening
the gate unless estate canon explicitly requires a narrower baseline.
