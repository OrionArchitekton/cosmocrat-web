import assert from 'node:assert/strict';
import test from 'node:test';
const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4197';
if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(origin).hostname)) throw new Error('Reference checks require a local server.');
const text = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
for (const route of ['about', 'docs', 'platform']) test(`the ${route} document explains its scope and preserves a usable public route`, async () => {
  const response = await fetch(`${origin}/${route}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, new RegExp(`rel="canonical"[^>]*href="[^"]*/${route}"`));
  assert.match(html, /href="\/tools"/);
  if (route === 'about') {
    assert.match(text(html), /cognitive continuity|cognitive-continuity/);
    assert.match(text(html), /human sovereignty/i);
    assert.match(text(html), /no complete OS installer/);
  } else if (route === 'docs') {
    assert.match(html, /coordinate-local-agents-with-orion-pm/);
    assert.match(text(html), /continuity walkthrough remains pinned to Starter 0\.2\.0-rc\.1/);
    assert.match(text(html), /development-evidence walkthrough teaches 0\.3\.0-rc\.1/);
    assert.match(text(html), /Both are previews/);
  } else {
    assert.match(text(html), /Architecture reference/);
    for (const topic of ['memory-infrastructure','decision-exhaust','runtime-governance','gate-system','chronicle-receipts','drift-guard']) assert.ok(html.includes(`href="/${topic}"`));
    assert.match(text(html), /independent|independently/);
  }
});

test('machine-readable identity and the versioned social card describe the same umbrella', async () => {
  const llms = await fetch(`${origin}/llms.txt`);
  assert.equal(llms.status, 200);
  assert.match(await llms.text(), /Cosmocrat OS/);
  const map = await fetch(`${origin}/sitemap.xml`).then(r => r.text());
  assert.ok(map.includes(`${origin}/tools`));
  const page = await fetch(`${origin}/about`).then(r => r.text());
  assert.match(page, /name="robots" content="noindex, nofollow"/);
  assert.match(page, /og\?v=4/);
  const image = await fetch(`${origin}/og?v=4`);
  assert.equal(image.status, 200);
  assert.match(image.headers.get('content-type'), /image\/png/);
  const data = Buffer.from(await image.arrayBuffer());
  assert.equal(data.subarray(1,4).toString(), 'PNG');
  assert.equal(data.readUInt32BE(16), 1200);
  assert.equal(data.readUInt32BE(20), 630);
});
