import assert from 'node:assert/strict';
import test from 'node:test';

const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4180';
const target = new URL(origin);
if (!['127.0.0.1', 'localhost', '[::1]'].includes(target.hostname)) {
  throw new Error('Site contract tests require an explicitly local server.');
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function structuredData(html) {
  return [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ].flatMap((match) => {
    const data = JSON.parse(match[1]);
    return data['@graph'] || [data];
  });
}

test('homepage offers the independent tools under human direction with an honest current state', async () => {
  const response = await fetch(`${origin}/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visibleText(html);
  assert.match(text, /An AI operating system you remain in charge of\./);
  assert.match(text, /Independent tools are available today/);
  assert.match(text, /Starter combinations are previews/);
  assert.match(html, /href="\/tools"/);
  assert.match(html, /coordinate-local-agents-with-orion-pm/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
  assert.match(html, /name="robots" content="noindex, nofollow"/);
});

test('catalog renders all independent entries and preserves exact preview and public-scope links', async () => {
  const response = await fetch(`${origin}/tools`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const text = visibleText(html);
  for (const name of [
    'Orion PM',
    'Orion Browser',
    'Orion Phone',
    'Orion Handoff',
    'Orion Results',
    'Orion Worktree Report',
    'Orion Starter',
    'failclosed',
    'Orion Skills',
    'Remote Hands',
  ]) {
    assert.ok(text.includes(name), `Missing server-rendered tool: ${name}`);
  }
  assert.equal((html.match(/<article[^>]*data-tool=/g) || []).length, 10);
  assert.match(text, /continuity guide.*0\.2\.0-rc\.1/i);
  assert.match(html, /orion-starter\/releases\/tag\/v0\.3\.0-rc\.1/);
  assert.match(text, /public experiment is start-only/i);
  assert.match(html, /github\.com\/OrionArchitekton\/remote-hands/);
  assert.doesNotMatch(html, /github\.com\/OrionArchitekton\/orion-remote-hands/);
  assert.doesNotMatch(html, /googletagmanager\.com/);
});

test('origin and machine-readable identity agree about the umbrella without losing existing destinations', async () => {
  const about = await fetch(`${origin}/about`).then((response) => response.text());
  assert.match(visibleText(about), /Orion Estate/);
  assert.match(visibleText(about), /continuity/i);
  assert.doesNotMatch(visibleText(about), /physically gated at the substrate/);
  const home = structuredData(await fetch(`${origin}/`).then((response) => response.text()));
  const organization = home.find((entry) => entry['@id'] === `${origin}/#organization`);
  assert.equal(organization.founder['@id'], 'https://www.danmercede.com/#person');
  assert.equal(
    organization.parentOrganization['@id'],
    'https://www.orionapexcapital.com/#organization'
  );
  assert.equal(home.filter((entry) => entry['@type'] === 'WebPage').length, 1);
  const catalog = structuredData(
    await fetch(`${origin}/tools`).then((response) => response.text())
  );
  assert.ok(
    catalog.some(
      (entry) => entry['@type'] === 'WebPage' && entry['@id'] === `${origin}/tools#webpage`
    )
  );
  const list = catalog.find((entry) => entry['@type'] === 'ItemList');
  assert.equal(list.numberOfItems, 10);
  assert.equal(list.itemListElement.length, 10);
  const sitemap = await fetch(`${origin}/sitemap.xml`).then((response) => response.text());
  for (const path of ['/tools', '/about', '/platform', '/privacy', '/terms', '/waitlist']) {
    assert.ok(sitemap.includes(`${origin}${path}`), `Missing sitemap path: ${path}`);
  }
  const llms = await fetch(`${origin}/llms.txt`).then((response) => response.text());
  assert.match(llms, /Cosmocrat OS/);
  assert.match(llms, /kernel integration/);
  assert.ok(llms.includes(`${origin}/tools`));
  const docsResponse = await fetch(`${origin}/docs`);
  assert.equal(docsResponse.status, 200);
  const docs = await docsResponse.text();
  assert.match(docs, /href="\/tools"/);
});

test('governance URLs remain architectural references and legal and intake pages remain available', async () => {
  for (const path of [
    '/platform',
    '/runtime-governance',
    '/gate-system',
    '/memory-infrastructure',
    '/decision-exhaust',
    '/chronicle-receipts',
    '/drift-guard',
  ]) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, path);
    const text = visibleText(await response.text());
    assert.match(text, /Architecture reference/, path);
    assert.doesNotMatch(
      text,
      /mathematically impossible|Perfect historical replayability|Policy checks occur in microseconds/i,
      path
    );
    assert.doesNotMatch(
      text,
      /mediates every input|ensuring safety regardless of model variance|record of every AI and human decision|continuously detects and halts divergence|it did not happen\.|G0-G3 are structural and always active|interface returns only what it is allowed to see/i,
      path
    );
  }
  for (const path of ['/privacy', '/terms', '/contact', '/waitlist']) {
    assert.equal((await fetch(`${origin}${path}`)).status, 200, path);
  }
});

test('motion welcome keeps the static homepage and offers native media and a direct skip', async () => {
  const response = await fetch(`${origin}/`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /data-motion-welcome/);
  assert.match(html, /<video/);
  assert.match(html, /cosmocrat-welcome-desktop\.mp4/);
  assert.match(html, /cosmocrat-welcome-mobile\.mp4/);
  assert.match(html, /href="#static-site"/);
  assert.match(html, /id="static-site"/);
  assert.match(visibleText(html), /An AI operating system you remain in charge of\./);
  assert.doesNotMatch(html, /googletagmanager\.com/);
});
