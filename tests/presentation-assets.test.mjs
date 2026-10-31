import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import test from 'node:test';
import ts from 'typescript';

test('Results keeps its published identity while visibly disclosing candidate readiness', async () => {
  const source = await readFile(new URL('../src/lib/toolCatalog.ts', import.meta.url), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
  });
  const { tools } = await import(
    `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`
  );
  const results = tools.find((tool) => tool.id === 'orion-results');
  assert.equal(results.name, 'Orion Results');
  assert.equal(results.version, 'v0.1.0');
  assert.equal(results.status, 'PREVIEW');
  assert.match(results.boundary, /release candidate/i);
  assert.equal(
    results.release,
    'https://github.com/OrionArchitekton/orion-results/releases/tag/v0.1.0'
  );
});

test('the bundled wordmark preserves the verified official source', async () => {
  const png = await readFile(new URL('../public/brand/cosmocrat-wordmark.png', import.meta.url));
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.deepEqual([png.readUInt32BE(16), png.readUInt32BE(20)], [604, 74]);
  // Byte-compared to the official GCS wordmark on October 30, 2026. No network in tests.
  assert.equal(
    createHash('sha256').update(png).digest('hex'),
    '5eecbec7a21c7f79d8f0d2d319e46aceeb597dedb114f261a40d40fa29969a6b'
  );
});

function hasGlyph(font, point) {
  let cmap;
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const entry = 12 + i * 16;
    if (font.toString('ascii', entry, entry + 4) === 'cmap') cmap = font.readUInt32BE(entry + 8);
  }
  assert.ok(cmap, 'Font has a cmap');
  for (let i = 0; i < font.readUInt16BE(cmap + 2); i++) {
    const entry = cmap + 4 + i * 8;
    const platform = font.readUInt16BE(entry);
    const encoding = font.readUInt16BE(entry + 2);
    if (platform !== 0 && !(platform === 3 && [1, 10].includes(encoding))) continue;
    const table = cmap + font.readUInt32BE(entry + 4);
    const format = font.readUInt16BE(table);
    if (format === 12) {
      for (let g = 0; g < font.readUInt32BE(table + 12); g++) {
        const group = table + 16 + g * 12;
        const start = font.readUInt32BE(group);
        if (start <= point && point <= font.readUInt32BE(group + 4)) {
          if (font.readUInt32BE(group + 8) + point - start !== 0) return true;
        }
      }
    }
    if (format === 4 && point <= 0xffff) {
      const count = font.readUInt16BE(table + 6) / 2;
      const ends = table + 14;
      const starts = ends + count * 2 + 2;
      const deltas = starts + count * 2;
      const ranges = deltas + count * 2;
      for (let segment = 0; segment < count; segment++) {
        const start = font.readUInt16BE(starts + segment * 2);
        if (point < start || point > font.readUInt16BE(ends + segment * 2)) continue;
        const delta = font.readInt16BE(deltas + segment * 2);
        const address = ranges + segment * 2;
        const offset = font.readUInt16BE(address);
        let glyph = offset ? font.readUInt16BE(address + offset + (point - start) * 2) : point;
        if (!offset || glyph) glyph = (glyph + delta) & 0xffff;
        if (glyph) return true;
      }
    }
  }
  return false;
}

test('static Inter subsets cover their declared refresh copy and active bundled card copy', async () => {
  const targets = [
    ['600', 'DESCRIPTOR', 'Tools for human-directed AI work.'],
    ['400', 'TAGLINE', 'Coordinate agents. Carry context forward. Keep authority with you.'],
  ];
  const route = await readFile(new URL('../src/app/og/route.tsx', import.meta.url), 'utf8');
  const active = route.includes('src/styles/fonts/og-inter-');
  for (const [weight, name, target] of targets) {
    const font = await readFile(
      new URL(`../src/styles/fonts/og-inter-${weight}.ttf`, import.meta.url)
    );
    const copy = active ? route.match(new RegExp(`const ${name} = '([^']+)'`))?.[1] : target;
    assert.ok(copy, `Declared ${name} copy is available`);
    for (const letter of new Set(target + copy)) {
      assert.ok(
        hasGlyph(font, letter.codePointAt(0)),
        `${weight} is missing ${JSON.stringify(letter)}`
      );
    }
  }
});
