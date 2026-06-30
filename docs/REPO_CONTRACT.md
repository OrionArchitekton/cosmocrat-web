# Cosmocrat Web Repo Contract

Date: 2026-06-30

Status: binding repo-local contract.

## Current Name

- `cosmocrat-web`

## Recommended Name

- `cosmocrat-web`

## Role

- `web`

## Purpose

`cosmocrat-web` is the public marketing and authority surface for Cosmocrat. It
publishes public pages, authority content, SEO metadata, structured data,
analytics-safe marketing plumbing, and early-access intake.

It is not the kernel, runtime substrate, infrastructure packaging home,
operator plane, or GTM workflow-truth repo.

## Owns

- public Cosmocrat pages and category-definition content
- authority-surface UX and public explanations
- early-access intake forms and server actions
- SEO, metadata, structured data, sitemap, and robots behavior
- web-only tests, build configuration, and Vercel-facing wiring
- fail-closed environment validation for public-site builds

## Does Not Own

- kernel authority, policy evaluation, mutation truth, or receipts
- runtime substrate or orchestration logic
- shared infra packaging or deploy composition
- operator dashboards or operator control flows
- GTM workflow canon or GTM business logic
- model, prompt, decision, or customer production data

## Allowed Dependencies

- repo-local Next.js, React, Tailwind, Zod, Supabase, and Resend dependencies
- Doppler-managed environment variables
- optional Cosmocrat ingest forwarding by explicit web-safe contract
- `cosmocrat-kernel`, `orion-runtime`, `orion-infra`, and
  `cosmocrat-gtm-engine` as named external authority homes
- estate doctrine from `orion-estate-audit`

## Forbidden Logic / Forbidden Ownership

- kernel decision, receipt, policy, or authority behavior
- runtime orchestration, tool execution, or shared infra ownership
- operator-plane behavior
- GTM workflow ownership or business-truth flows
- storing prompt, decision, model, or production customer data

## PR Reject Rules

- reject PRs that move kernel, runtime, infra, operator, or GTM ownership here
- reject PRs that redefine Cosmocrat decision or receipt semantics
- reject PRs that add production workflow execution or shared-service duties
- reject PRs that weaken fail-closed public-site environment validation

## Verification

For docs-only contract changes:

```bash
git diff --check
```

For implementation changes, follow `AGENTS.md` and run `npm ci`,
`npm run lint`, `npm run typecheck`, and the relevant build check.

## Basis

- `AGENTS.md`
- `README.md`
- `.github/workflows/ci.yml`
- `repos/repo_contract_registry_20260317.csv` in
  `OrionArchitekton/orion-estate-audit`
- `COSMOCRAT_PRODUCT_FAMILY_REPO_CONTRACT_20260317.md` in
  `OrionArchitekton/orion-estate-audit`
