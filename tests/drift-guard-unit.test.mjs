import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const repoRoot = new URL('..', import.meta.url).pathname;
const outDir = mkdtempSync(join(tmpdir(), 'cosmocrat-unit-'));

for (const name of ['attribution', 'analytics', 'driftSlopAnalyzer']) {
  const source = readFileSync(join(repoRoot, `src/lib/${name}.ts`), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  writeFileSync(join(outDir, `${name}.cjs`), compiled.outputText, 'utf8');
}

// Re-point relative require('./attribution') to attribution.cjs inside tmp dir.
const analyticsCode = readFileSync(join(outDir, 'analytics.cjs'), 'utf8').replace(
  /require\(["']\.\/attribution["']\)/g,
  'require("./attribution.cjs")'
);
writeFileSync(join(outDir, 'analytics.cjs'), analyticsCode, 'utf8');

const attribution = require(join(outDir, 'attribution.cjs'));
const analytics = require(join(outDir, 'analytics.cjs'));
const analyzer = require(join(outDir, 'driftSlopAnalyzer.cjs'));

test.after(() => {
  rmSync(outDir, { recursive: true, force: true });
});

test('UTM extraction strips PII emails and preserves attribution parameters', () => {
  const parsed = attribution.extractUtmParams(
    '?utm_source=linkedin&utm_medium=social&utm_campaign=drift-q4&utm_content=hero&utm_term=user@example.com&ignored=1'
  );
  assert.deepEqual(parsed, {
    utm_source: 'linkedin',
    utm_medium: 'social',
    utm_campaign: 'drift-q4',
    utm_content: 'hero',
  });

  const merged = attribution.mergeUtmParams(
    { utm_source: 'x', utm_content: 'card' },
    { utm_source: 'linkedin', utm_medium: 'social', utm_campaign: 'drift-q4' }
  );
  assert.deepEqual(merged, {
    utm_source: 'x',
    utm_medium: 'social',
    utm_campaign: 'drift-q4',
    utm_content: 'card',
  });

  const appended = attribution.appendUtmParams('/waitlist?focus=drift#form', merged);
  assert.equal(
    appended,
    '/waitlist?focus=drift&utm_source=x&utm_medium=social&utm_campaign=drift-q4&utm_content=card#form'
  );
});

test('resolveDebugMode activates for ?debug_mode=1, non-production, localhost, and preview hosts', () => {
  assert.equal(
    attribution.resolveDebugMode({
      search: '',
      hostname: 'www.cosmocrat.ai',
      nodeEnv: 'production',
      siteEnv: 'production',
      vercelEnv: 'production',
    }),
    false
  );
  assert.equal(
    attribution.resolveDebugMode({
      search: '?debug_mode=1',
      hostname: 'www.cosmocrat.ai',
      nodeEnv: 'production',
      siteEnv: 'production',
    }),
    true
  );
  assert.equal(
    attribution.resolveDebugMode({
      search: '',
      hostname: 'www.cosmocrat.ai',
      nodeEnv: 'development',
      siteEnv: 'production',
    }),
    true
  );
  assert.equal(
    attribution.resolveDebugMode({
      search: '',
      hostname: 'cosmocrat-preview.vercel.app',
      nodeEnv: 'production',
      siteEnv: 'production',
    }),
    true
  );
  assert.equal(
    attribution.resolveDebugMode({
      search: '',
      hostname: '127.0.0.1',
      nodeEnv: 'production',
      siteEnv: 'production',
    }),
    true
  );
});

test('buildGa4EventPayload produces typed events with UTMs and debug_mode without leaking extra data', () => {
  const payload = analytics.buildGa4EventPayload({
    event: 'gate_simulator_run',
    pagePath: '/drift-guard',
    utms: { utm_source: 'google', utm_campaign: 'drift-guard' },
    debugMode: true,
    params: { verdict: 'FAIL', score: 34, word_count: 72 },
  });
  assert.deepEqual(payload, {
    event: 'gate_simulator_run',
    verdict: 'FAIL',
    score: 34,
    word_count: 72,
    utm_source: 'google',
    utm_campaign: 'drift-guard',
    page_path: '/drift-guard',
    debug_mode: true,
  });
});

test('driftSlopAnalyzer detects em dashes, Kobak clusters, negative parallelism, thriller cliches, passive voice, and low burstiness', () => {
  const emDash = String.fromCodePoint(0x2014);
  const enDash = String.fromCodePoint(0x2013);
  const slopSample = [
    `In today's digital age, our system wasn't just a check, it was a paradigm shift${emDash}showcasing meticulous alignment.`,
    `A comprehensive audit was conducted by the team to bolster governance and streamline workflows across the realm.`,
    `These pivotal findings were leveraged behind closed doors to foster resilience across the stack${enDash}notably ahead of schedule.`,
    `Notably, this robust approach underscores how the framework was deployed by engineers to deliver value.`,
  ].join(' ');

  const report = analyzer.analyzeAgentDrift(slopSample);
  assert.equal(report.metrics.longDashCount, 2);
  assert.ok(report.metrics.hardSlopCount >= 2);
  assert.ok(report.metrics.kobakExcessCount >= 6);
  assert.ok(report.metrics.negativeParallelismCount >= 1);
  assert.ok(report.metrics.thrillerClicheCount >= 1);
  assert.ok(report.metrics.passiveRatioPct >= 12);
  assert.equal(report.metrics.verdict, 'FAIL');
  assert.ok(report.findings.some((f) => f.ruleId === 'BANNED_LONG_DASH'));
  assert.ok(report.findings.some((f) => f.ruleId === 'KOBAK_EXCESS_CLUSTER'));
  assert.ok(report.findings.some((f) => f.ruleId === 'NEGATIVE_PARALLELISM'));
  assert.ok(report.findings.some((f) => f.ruleId === 'THRILLER_CLICHE'));
  assert.ok(report.findings.some((f) => f.ruleId === 'EXCESS_PASSIVE_VOICE'));
});

test('driftSlopAnalyzer exempts URL slugs and passes clean operator prose', () => {
  const cleanOperator = [
    'On Nov 4 at 14:02 UTC, the CI gate exited 0 while GIT_WORK_TREE still pointed at the clean primary checkout.',
    'The check did not lie.',
    'It read the wrong directory.',
    'We removed the inherited env export from tests/run-gate.sh and re-ran against commit 8f12c9a at https://example.com/seamless-rollbacks.',
    'Three failing path checks surfaced within 400ms.',
  ].join(' ');

  const report = analyzer.analyzeAgentDrift(cleanOperator);
  assert.equal(report.metrics.longDashCount, 0);
  assert.equal(report.metrics.hardSlopCount, 0);
  assert.equal(report.metrics.negativeParallelismCount, 0);
  assert.equal(report.metrics.thrillerClicheCount, 0);
  assert.equal(report.metrics.passiveSentenceCount, 0);
  assert.ok(report.metrics.burstinessCv >= 0.42, `expected CV >= 0.42, got ${report.metrics.burstinessCv}`);
  assert.equal(report.metrics.verdict, 'PASS');
});
