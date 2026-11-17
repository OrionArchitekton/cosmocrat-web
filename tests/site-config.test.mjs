import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

function loadConfig(site, vercel, canonical) {
  const env = { ...process.env, SITE_ENV: site, VERCEL_ENV: vercel, NEXT_PUBLIC_SITE_URL: canonical };
  return spawnSync(process.execPath, ['-e', "require('./next.config.js')"], { env });
}

test('a Vercel production build requires both production indexing and the public canonical', () => {
  const canonical = 'https://www.cosmocrat.ai';
  assert.equal(loadConfig('production', 'production', canonical).status, 0);
  for (const site of ['', 'staging', 'development']) {
    assert.notEqual(loadConfig(site, 'production', canonical).status, 0);
  }
  for (const invalid of ['', 'https://example.invalid', canonical + '/path', canonical + '?q=1']) {
    assert.notEqual(loadConfig('production', 'production', invalid).status, 0);
  }
  assert.notEqual(loadConfig('production', 'preview', canonical).status, 0);
  assert.equal(loadConfig('staging', 'preview', 'http://127.0.0.1:3000').status, 0);
});
