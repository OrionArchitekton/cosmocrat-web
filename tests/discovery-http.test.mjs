import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

const origin = process.env.SITE_TEST_ORIGIN || 'http://127.0.0.1:4180';
if (!['127.0.0.1', 'localhost', '[::1]'].includes(new URL(origin).hostname)) {
  throw new Error('Discovery checks require an explicitly local server.');
}

const pillars = [
  'gate-system',
  'chronicle-receipts',
  'decision-exhaust',
  'runtime-governance',
  'drift-guard',
  'memory-infrastructure',
];
const homeTitle = 'Cosmocrat OS | Tools for human-directed AI work';
const entities = {
  '&amp;': '&',
  '&quot;': '"',
  '&#x27;': "'",
  '&#39;': "'",
  '&lt;': '<',
  '&gt;': '>',
};

function readSchemas(html) {
  return [
    ...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ].flatMap((match) => {
    const node = JSON.parse(match[1]);
    return node['@graph'] || [node];
  });
}

function checkVisibleFaq(html, schemas, count) {
  const text = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&(?:amp|quot|#x27|#39|lt|gt);/g, (token) => entities[token])
    .replace(/\s+/g, ' ');
  const faq = schemas.find((node) => node['@type'] === 'FAQPage');
  assert.ok(faq);
  assert.equal(faq.mainEntity.length, count);
  for (const question of faq.mainEntity) {
    assert.equal(question['@type'], 'Question');
    assert.equal(question.acceptedAnswer['@type'], 'Answer');
    assert.ok(text.includes(question.name), question.name);
    assert.ok(text.includes(question.acceptedAnswer.text), question.name);
  }
}

test('the welcome video has four seekable chapters and the homepage retains a single brand in its title', async () => {
  const html = await fetch(origin).then((response) => response.text());
  assert.equal(html.match(/<title>(.*?)<\/title>/)?.[1], homeTitle);
  assert.ok(html.includes(`property="og:title" content="${homeTitle}"`));
  const schemas = readSchemas(html);
  checkVisibleFaq(html, schemas, 5);
  const video = schemas.find((node) => node['@type'] === 'VideoObject');
  assert.deepEqual(
    video.hasPart.map((clip) => clip.startOffset),
    [0, 5, 11, 17]
  );
  assert.equal(video.duration, `PT${video.hasPart.at(-1).endOffset}S`);
  assert.equal(
    new URL(video.contentUrl).pathname,
    '/media/cosmocrat/cosmocrat-welcome-desktop.mp4'
  );
  assert.equal(
    new URL(video.thumbnailUrl).pathname,
    '/media/cosmocrat/cosmocrat-welcome-desktop.jpg'
  );
  for (const [index, clip] of video.hasPart.entries()) {
    assert.equal(clip['@type'], 'Clip');
    assert.ok(clip.endOffset > clip.startOffset);
    if (index) assert.equal(clip.startOffset, video.hasPart[index - 1].endOffset);
    assert.equal(clip.url, `${origin}/?t=${clip.startOffset}`);
  }
});

test('each architecture FAQ matches its rendered answers and links back to the platform through its breadcrumbs', async () => {
  for (const slug of pillars) {
    const html = await fetch(`${origin}/${slug}`).then((response) => response.text());
    const schemas = readSchemas(html);
    checkVisibleFaq(html, schemas, 4);
    const breadcrumbs = schemas.find((node) => node['@type'] === 'BreadcrumbList');
    assert.deepEqual(
      breadcrumbs.itemListElement.map((item) => item.position),
      [1, 2, 3]
    );
    assert.deepEqual(
      breadcrumbs.itemListElement.map((item) => item.item),
      [`${origin}/`, `${origin}/platform`, `${origin}/${slug}`]
    );
  }
});

test('tool entries describe their released artifacts and keep the source-only experiment unversioned', async () => {
  const html = await fetch(`${origin}/tools`).then((response) => response.text());
  const catalog = readSchemas(html).find((node) => node['@type'] === 'ItemList');
  assert.equal(catalog.itemListElement.length, 10);
  for (const { item } of catalog.itemListElement) {
    assert.equal(item['@type'], 'SoftwareApplication');
    assert.equal(item.applicationCategory, 'DeveloperApplication');
    assert.equal(item.subjectOf['@type'], 'SoftwareSourceCode');
    assert.match(item.subjectOf.codeRepository, /^https:\/\/github.com\/OrionArchitekton\//);
    assert.ok(item.license.startsWith(item.subjectOf.codeRepository + '/blob/'));
    if (item.name === 'Remote Hands') {
      assert.equal(item.softwareVersion, undefined);
      assert.equal(item.downloadUrl, undefined);
    } else {
      assert.ok(item.softwareVersion);
      assert.ok(item.releaseNotes.startsWith(item.subjectOf.codeRepository + '/releases/tag/'));
      if (item.downloadUrl)
        assert.ok(
          item.downloadUrl.startsWith(item.subjectOf.codeRepository + '/releases/download/')
        );
    }
  }
});

test('the seven topical share cards have distinct PNGs while the v4 home image stays available', async () => {
  const images = new Set();
  for (const slug of ['', 'tools', ...pillars]) {
    const html = await fetch(`${origin}/${slug}`).then((response) => response.text());
    const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    const expected = slug ? `/og/${slug}?v=1` : '/og?v=4';
    assert.equal(image, origin + expected);
    assert.ok(html.includes(`name="twitter:image" content="${image}"`));
    const response = await fetch(image);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^image\/png/);
    const png = Buffer.from(await response.arrayBuffer());
    assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [1200, 630]);
    images.add(createHash('sha256').update(png).digest('hex'));
  }
  assert.equal(images.size, 8);
});
