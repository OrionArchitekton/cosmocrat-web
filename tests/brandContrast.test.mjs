import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import Color from 'colorjs.io';

const ROOT = join(import.meta.dirname, '..');

function resolveColor(tokens, ref) {
  const [, key] = ref.split('.');
  const entry = tokens.color[key];
  assert.ok(entry, `Missing color token ${ref}`);
  return entry.$value;
}

function collectFiles(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      collectFiles(full, exts, out);
    } else if (exts.has(name.slice(name.lastIndexOf('.')))) {
      out.push(full);
    }
  }
  return out;
}

test('cosmocrat-web tokens satisfy WCAG 2.1 AA and APCA contrast pairs', () => {
  const raw = readFileSync(join(ROOT, 'tokens/brand.tokens.json'), 'utf8');
  const tokens = JSON.parse(raw);
  const pairs = tokens.$extensions['com.orion.contrastPairs'];

  assert.ok(pairs.length >= 10, 'Expected at least 10 semantic contrast pairs');

  for (const pair of pairs) {
    const fgHex = resolveColor(tokens, pair.fg);
    const bgHex = resolveColor(tokens, pair.bg);
    const fg = new Color(fgHex);
    const bg = new Color(bgHex);
    const wcag = fg.contrast(bg, 'WCAG21');
    const apca = Math.abs(fg.contrast(bg, 'APCA'));
    const minWcag = pair.level === 'normal' ? 4.5 : 3.0;

    assert.ok(
      wcag >= minWcag,
      `${pair.name} (${fgHex} on ${bgHex}) WCAG21=${wcag.toFixed(2)} < ${minWcag}`
    );

    if (pair.name === 'body-on-bg') {
      assert.ok(apca >= 60, `${pair.name} APCA Lc=${apca.toFixed(2)} < 60`);
    } else if (pair.level === 'normal') {
      assert.ok(apca >= 45, `${pair.name} APCA Lc=${apca.toFixed(2)} < 45`);
    }
  }
});

test('DESIGN.md, tokens, and src contain zero Unicode long dashes and include reduced-motion', () => {
  const design = readFileSync(join(ROOT, 'DESIGN.md'), 'utf8');
  const tokens = readFileSync(join(ROOT, 'tokens/brand.tokens.json'), 'utf8');
  const osCss = readFileSync(join(ROOT, 'src/styles/os.css'), 'utf8');

  assert.equal(/[\u2013\u2014\u2015]/.test(design), false, 'DESIGN.md contains long dashes');
  assert.equal(/[\u2013\u2014\u2015]/.test(tokens), false, 'brand.tokens.json contains long dashes');
  assert.match(osCss, /@media\s*\(\s*prefers-reduced-motion:\s*reduce\s*\)/);

  const srcFiles = collectFiles(
    join(ROOT, 'src'),
    new Set(['.ts', '.tsx', '.css', '.js', '.jsx'])
  );
  for (const file of srcFiles) {
    const text = readFileSync(file, 'utf8');
    assert.equal(
      /[\u2013\u2014\u2015]/.test(text),
      false,
      `Long dash found in ${file}`
    );
  }
});
