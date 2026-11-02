// Test process only: never permit the real mail provider to receive a request.
const selected = new URL(process.env.INTAKE_TEST_MAIL_ORIGIN);
if (selected.protocol !== 'http:' || selected.hostname !== '127.0.0.1') {
  throw new Error('Select a synthetic loopback mail endpoint');
}
const nativeFetch = globalThis.fetch;
globalThis.fetch = (input, init) => {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  if (url.origin === 'https://api.resend.com' && url.pathname === '/emails') {
    return nativeFetch(new URL('/emails', selected), init);
  }
  if (url.protocol !== 'http:' || url.hostname !== '127.0.0.1') {
    throw new Error('Synthetic intake tests refuse external network access');
  }
  return nativeFetch(input, init);
};
