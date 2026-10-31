import assert from 'node:assert/strict';
import test from 'node:test';
const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4196';
if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(origin).hostname)) throw new Error('Architecture checks require a local server.');
const routes = ['runtime-governance', 'gate-system', 'memory-infrastructure', 'decision-exhaust', 'chronicle-receipts', 'drift-guard'];
for (const route of routes) test(`the ${route} reference preserves its route and qualifies its integration boundary`, async () => {
  const response = await fetch(`${origin}/${route}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  assert.match(html, new RegExp(`rel="canonical"[^>]*href="[^"]*/${route}"`));
  assert.match(html, /aria-label="Architecture scope"/);
  assert.match(text, /Architecture reference/);
  assert.match(text, /family membership does not establish kernel integration/);
  assert.match(html, /href="\/tools"/);
  assert.match(text, /enrolled|integration/);
  if (route === 'decision-exhaust') {
    assert.match(text, /Illustrative decision receipt/);
    assert.match(text, /Separate provider response/);
    assert.doesNotMatch(text, /execution receipt|Receipts establish intent, authority, and outcome|system.s legal record|links the intent to the outcome cryptographically/i);
  }
  assert.doesNotMatch(text, /physically impossible to bypass|guarantees zero drift|perfect replay|sub-millisecond enforcement/i);
});
