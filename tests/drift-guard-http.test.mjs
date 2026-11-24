import assert from 'node:assert/strict';
import test from 'node:test';

const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4180';
const target = new URL(origin);
if (!['127.0.0.1', 'localhost', '[::1]'].includes(target.hostname)) {
  throw new Error('Drift guard HTTP checks require an explicitly local server.');
}

test('drift-guard page renders interactive diagnostic, transparent metrics, and pilot CTA without staging GTM', async () => {
  const response = await fetch(`${origin}/drift-guard`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Agent Drift &amp; Slop Gate Diagnostic/);
  assert.match(html, /id="drift-guard-input"/);
  assert.match(html, /data-drift-run/);
  assert.match(html, /data-drift-pilot-cta/);
  assert.match(html, /href="\/waitlist\?/);
  assert.match(html, /Architecture reference/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
});
