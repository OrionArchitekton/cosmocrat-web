import { Resend } from 'resend';

let _client: Resend | null = null;

export function resendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;

  if (_client) return _client;
  _client = new Resend(key);
  return _client;
}

export function resendFrom(): string {
  return process.env.RESEND_FROM_EMAIL || process.env.CONTACT_EMAIL || 'contact@cosmocrat.ai';
}

export function resendReplyTo(): string {
  return process.env.RESEND_REPLY_TO || process.env.CONTACT_EMAIL || 'contact@cosmocrat.ai';
}
