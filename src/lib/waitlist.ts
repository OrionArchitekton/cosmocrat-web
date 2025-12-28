import { z } from 'zod';

export const WaitlistSignupSchema = z.object({
  email: z.string().email().max(320),
  name: z.string().max(120).optional().or(z.literal('')),
  first_run: z.string().max(500).optional().or(z.literal('')),

  // attribution (optional)
  utm_source: z.string().max(200).optional().or(z.literal('')),
  utm_medium: z.string().max(200).optional().or(z.literal('')),
  utm_campaign: z.string().max(200).optional().or(z.literal('')),
  utm_content: z.string().max(200).optional().or(z.literal('')),
  utm_term: z.string().max(200).optional().or(z.literal('')),
  referrer: z.string().max(500).optional().or(z.literal('')),
  landing_path: z.string().max(500).optional().or(z.literal('')),

  // anti-spam honeypot
  website: z.string().max(200).optional().or(z.literal(''))
});

export type WaitlistSignupInput = z.infer<typeof WaitlistSignupSchema>;

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeOptionalString(v: unknown) {
  if (typeof v !== 'string') return undefined;
  const t = v.trim();
  return t.length ? t : undefined;
}
