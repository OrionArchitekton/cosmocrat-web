import assert from 'node:assert/strict';
import test from 'node:test';

const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4195';
if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(origin).hostname)) {
  throw new Error('Catalog checks require an explicitly local server.');
}
const visible = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

test('the initial catalog document offers all ten independent tools without JavaScript', async () => {
  const response = await fetch(`${origin}/tools`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const articles = [...html.matchAll(/<article\b[^>]*data-tool="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g)];
  assert.equal(articles.length, 10);
  for (const name of ['Orion PM', 'Orion Browser', 'Orion Phone', 'Orion Handoff', 'Orion Results', 'Orion Worktree Report', 'Orion Starter', 'failclosed', 'Orion Skills', 'Remote Hands']) {
    assert.ok(visible(html).includes(name), `Missing initial-document tool ${name}`);
  }
  const cards = Object.fromEntries(articles.map(([, id, body]) => [id, body]));
  for (const card of Object.values(cards)) {
    assert.match(card, /<details/);
    assert.match(card, /href="https:\/\//);
  }
  assert.match(visible(cards['orion-results']), /PREVIEW/);
  assert.match(visible(cards['orion-starter']), /PREVIEW/);
  assert.match(visible(cards['remote-hands']), /EXPERIMENTAL/);
  assert.match(visible(cards['orion-starter']), /continuity guide.*0\.2\.0-rc\.1/i);
  assert.match(cards['orion-starter'], /orion-starter\/releases\/tag\/v0\.3\.0-rc\.1/);
  assert.match(cards['remote-hands'], /github\.com\/OrionArchitekton\/remote-hands/);
  assert.doesNotMatch(html, /github\.com\/OrionArchitekton\/orion-remote-hands/);
  assert.match(html, /rel="canonical"[^>]*href="[^"]*\/tools"/);
});

test('visitors and crawlers can find the catalog from the current website', async () => {
  const home = await fetch(`${origin}/`).then(r => r.text());
  const navigation = home.match(/<header\b[\s\S]*?<\/header>/)?.[0];
  assert.ok(navigation);
  assert.match(navigation, /href="\/tools"/);
  const map = await fetch(`${origin}/sitemap.xml`).then(r => r.text());
  assert.match(map, /\/tools<\/loc>/);
  const catalog = await fetch(`${origin}/tools`).then(r => r.text());
  assert.match(visible(catalog), /10 of 10 tools/);
});
