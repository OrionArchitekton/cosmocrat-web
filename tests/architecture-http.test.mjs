import assert from 'node:assert/strict';
import test from 'node:test';
const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4196';
if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(origin).hostname)) throw new Error('Architecture checks require a local server.');
const routes = ['runtime-governance', 'gate-system', 'memory-infrastructure', 'decision-exhaust', 'chronicle-receipts', 'drift-guard'];
for (const route of routes) test(`the ${route} reference preserves its route and qualifies its integration boundary`, async () => {
  const response = await fetch(`${origin}/${route}`, { redirect: 'manual' });
  assert.equal(response.status, 200);
  assert.equal(response.url, `${origin}/${route}`);
  const html = await response.text();
  const text = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const canonicalTags = [...html.matchAll(/<link\b[^>]*>/g)].map(match => match[0]).filter(tag => /\srel="canonical"/.test(tag));
  assert.equal(canonicalTags.length, 1);
  const canonical = new URL(canonicalTags[0].match(/\shref="([^"]*)"/)[1]);
  assert.ok(!canonical.username && !canonical.password, 'Canonical identity contains no credentials');
  const configuredOrigin = process.env.SITE_EXPECTED_CANONICAL_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredOrigin) assert.equal(canonical.origin, new URL(configuredOrigin).origin);
  else assert.ok([new URL(origin).origin, 'https://www.cosmocrat.ai'].includes(canonical.origin));
  assert.equal(canonical.pathname, `/${route}`);
  assert.equal(canonical.search + canonical.hash, '');
  assert.match(html, /aria-label="Architecture scope"/);
  assert.match(text, /Architecture reference/);
  assert.match(text, /family membership does not establish kernel integration/);
  const notices = html.match(/<aside\b[^>]*class="governance-context"[\s\S]*?<\/aside>/g) || [];
  assert.equal(notices.length, 1);
  assert.match(notices[0], /href="\/tools"/);
  assert.match(text, /enrolled|integration/);
  const body = html.replace(/<aside\b[\s\S]*?<\/aside>/g, '').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const qualifications = {
    'runtime-governance': /Coverage depends on the deployed integration/,
    'gate-system': /conceptual seven-stage model/i,
    'memory-infrastructure': /An enrolled memory change can retain/,
    'decision-exhaust': /Execution and external outcomes require separate retained evidence/,
    'chronicle-receipts': /enrolled governed decision/,
    'drift-guard': /explicitly enrolled retrieval paths/,
  };
  assert.match(body, qualifications[route]);
  const entities = { '&amp;': '&', '&quot;': '"', '&apos;': "'", '&#x27;': "'", '&#39;': "'", '&lt;': '<', '&gt;': '>' };
  const description = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/)?.[1]?.replace(/&(amp|quot|apos|#x27|#39|lt|gt);/g, value => entities[value]);
  assert.ok(description, 'The reference retains its page description');
  const documents = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => { const item = JSON.parse(match[1]); return item['@graph'] || [item]; });
  const page = documents.find(item => item['@type'] === 'WebPage' && item.url === canonical.href);
  assert.ok(page, 'The reference retains its own structured page identity');
  assert.equal(page.description, description);

  if (route === 'chronicle-receipts') {
    assert.doesNotMatch(text, /stamp every action|immutable truth|STATE_TRANSITION: Verified/i);
    assert.match(text, /enrolled governed decision/);
  }
  if (route === 'memory-infrastructure') assert.doesNotMatch(text, /every change is recorded/i);
  if (route === 'drift-guard') assert.doesNotMatch(text, /Context never bleeds|non-admissible memory is invisible/i);
  if (route === 'gate-system') assert.doesNotMatch(text, /Is the reasoning valid\?/);

  if (route === 'decision-exhaust') {
    assert.match(text, /Illustrative decision receipt/);
    assert.match(text, /Separate provider response/);
    assert.doesNotMatch(text, /execution receipt|Receipts establish intent, authority, and outcome|system.s legal record|links the intent to the outcome cryptographically/i);
  }
  assert.doesNotMatch(text, /physically impossible to bypass|guarantees zero drift|perfect replay|sub-millisecond enforcement/i);
});
