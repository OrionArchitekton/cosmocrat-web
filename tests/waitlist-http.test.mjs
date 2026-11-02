import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

test('built intake preserves validation, storage and honest mail acknowledgement', { timeout: 30000 }, async (t) => {
  const rows = [];
  const emails = [];
  let duplicate = false;
  let emailFailure = false;
  const database = createServer(async (req, res) => {
    assert.equal(req.method, 'POST');
    let body = '';
    for await (const chunk of req) body += chunk;
    res.setHeader('content-type', 'application/json');
    if (req.url === '/emails') {
      emails.push(JSON.parse(body));
      res.statusCode = emailFailure ? 422 : 200;
      res.end(JSON.stringify(emailFailure ? { name: 'validation_error', message: 'Synthetic mail refusal', statusCode: 422 } : { id: 'synthetic-mail-acceptance' }));
      return;
    }
    assert.equal(req.url, '/rest/v1/waitlist_signups');
    rows.push(JSON.parse(body));
    res.statusCode = duplicate ? 409 : 201;
    res.end(JSON.stringify(duplicate ? { code: '23505', message: 'Synthetic duplicate' } : null));
  });
  database.listen(0, '127.0.0.1');
  await once(database, 'listening');
  t.after(() => new Promise((resolve) => database.close(resolve)));

  let origin;
  // An explicit environment excludes production accounts, mail and ingest settings.
  // A separate argv value preserves spaces and decoded file URL characters.
  // Next owns the OS-assigned port before reporting its actual bound address.
  const server = spawn(process.execPath, ['--require', fileURLToPath(new URL('fixtures/intake-network.cjs', import.meta.url)), 'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '0'], {
    cwd: new URL('..', import.meta.url),
    env: {
      PATH: process.env.PATH,
      SITE_ENV: 'staging',
      NEXT_PUBLIC_SITE_URL: 'http://127.0.0.1',
      NEXT_TELEMETRY_DISABLED: '1',
      SUPABASE_URL: `http://127.0.0.1:${database.address().port}`,
      SUPABASE_SERVICE_ROLE_KEY: 'synthetic-test-value-never-a-real-credential',
      IP_HASH_SALT: 'synthetic-test-salt',
      RESEND_API_KEY: 'synthetic-test-value-never-a-real-credential',
      RESEND_REPLY_TO: 'reply@example.invalid',
      WAITLIST_NOTIFY_EMAIL: 'notify@example.invalid',
      INTAKE_TEST_MAIL_ORIGIN: `http://127.0.0.1:${database.address().port}`,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';
  server.stdout.on('data', (chunk) => { output += chunk; });
  server.stderr.on('data', (chunk) => { output += chunk; });
  t.after(async () => {
    if (server.exitCode === null && server.signalCode === null) {
      const exited = once(server, 'exit');
      server.kill('SIGTERM');
      await exited;
    }
  });
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      if (server.exitCode !== null || server.signalCode !== null) break;
      const bound = /Local:\s+(http:\/\/127\.0\.0\.1:[1-9]\d*)\b/.exec(output);
      if (bound) origin = bound[1];
      if (origin && output.includes('Ready in') && (await fetch(`${origin}/waitlist`)).status === 200) { ready = true; break; }
    } catch { /* Startup has not bound the loopback listener yet. */ }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, `Owned local server did not start: ${output}`);
  const submit = (body) => {
    assert.equal(server.exitCode, null, 'The owned intake server must still be running');
    assert.equal(server.signalCode, null);
    return fetch(`${origin}/api/waitlist`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.1' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
    });
  };
  let response = await submit('{');
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { ok: false, error: 'Invalid JSON' });
  response = await submit({ email: 'not-an-email', company: 'Synthetic', role: 'Tester' });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { ok: false, error: 'Invalid input' });
  const input = { email: 'Worker+Preview@example.invalid', name: '  Synthetic Worker  ', company: ' <b>Synthetic Company</b> ', role: ' Tester ', first_run: ' Preserve evidence ', utm_source: ' local-test ' };
  response = await submit({ ...input, website: 'synthetic-bot' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(rows.length, 0, 'Rejected and honeypot submissions must not reach storage');
  assert.equal(emails.length, 0, 'Rejected and honeypot submissions must not send mail');
  response = await submit(input);
  assert.equal(response.status, 200, output);
  assert.deepEqual(await response.json(), { ok: true, duplicate: false, emailSent: true });
  assert.equal(emails.length, 2);
  assert.equal(emails[0].reply_to, 'reply@example.invalid');
  const notification = emails.find((email) => JSON.stringify(email.to).includes('notify@example.invalid'));
  assert.ok(notification);
  assert.ok(notification.html.includes('&lt;b&gt;Synthetic Company&lt;/b&gt;'));
  assert.ok(!notification.html.includes('<b>Synthetic Company</b>'), 'Submitted text must not become operator-mail markup');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].email_norm, 'worker+preview@example.invalid');
  assert.equal(rows[0].name, 'Synthetic Worker');
  assert.equal(rows[0].company, '<b>Synthetic Company</b>', 'Escape only the output, preserving the stored text');
  assert.equal(rows[0].role, 'Tester');
  assert.equal(rows[0].first_run, 'Preserve evidence');
  assert.equal(rows[0].utm_source, 'local-test');
  assert.equal(rows[0].ip_hash, createHash('sha256').update('192.0.2.1|synthetic-test-salt').digest('hex'));
  duplicate = true;
  response = await submit(input);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, duplicate: true, emailSent: false });
  assert.equal(emails.length, 2, 'Duplicate submissions must not send another email');
  duplicate = false;
  emailFailure = true;
  response = await submit({ ...input, email: 'another@example.invalid' });
  assert.equal(response.status, 200, 'Mail refusal must not undo the stored signup');
  assert.deepEqual(await response.json(), { ok: true, duplicate: false, emailSent: false });
  assert.equal(rows.length, 3);
  assert.equal(emails.length, 4);
});
