import crypto from 'crypto';

function firstIpFromXForwardedFor(xff: string) {
  // X-Forwarded-For can be a comma separated list.
  return xff
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)[0];
}

export function getRequestIp(req: Request): string | undefined {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return firstIpFromXForwardedFor(xff);

  // Vercel / other proxies sometimes set this
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  return undefined;
}

export function hashIp(ip: string | undefined): string | undefined {
  if (!ip) return undefined;
  const salt = process.env.IP_HASH_SALT || 'change-me';
  return crypto.createHash('sha256').update(`${ip}|${salt}`).digest('hex');
}
