import { NextResponse } from 'next/server';

import { getRequestIp, hashIp } from '@/lib/requestMeta';
import {
  normalizeEmail,
  normalizeOptionalString,
  WaitlistSignupSchema
} from '@/lib/waitlist';
import { resendClient, resendFrom, resendReplyTo } from '@/lib/resendClient';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { waitlistConfirmationEmail } from '@/lib/waitlistEmail';

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = WaitlistSignupSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
  }

  const input = parsed.data;

  // Simple honeypot. If filled, silently succeed.
  if (input.website && input.website.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const email = input.email.trim();
  const email_norm = normalizeEmail(input.email);
  const name = normalizeOptionalString(input.name);
  const first_run = normalizeOptionalString(input.first_run);

  const ip = getRequestIp(req);
  const ip_hash = hashIp(ip);
  const user_agent = req.headers.get('user-agent') || undefined;

  const row = {
    email,
    email_norm,
    name,
    first_run,
    source: 'cosmocrat_web_v1',
    utm_source: normalizeOptionalString(input.utm_source),
    utm_medium: normalizeOptionalString(input.utm_medium),
    utm_campaign: normalizeOptionalString(input.utm_campaign),
    utm_content: normalizeOptionalString(input.utm_content),
    utm_term: normalizeOptionalString(input.utm_term),
    referrer: normalizeOptionalString(input.referrer),
    landing_path: normalizeOptionalString(input.landing_path),
    user_agent,
    ip_hash
  };

  const sb = supabaseAdmin();

  let duplicate = false;
  const { error } = await sb.from('waitlist_signups').insert(row as any);
  if (error) {
    // 23505 = unique_violation
    if ((error as any).code === '23505') {
      duplicate = true;
    } else {
      return NextResponse.json(
        { ok: false, error: 'Database insert failed' },
        { status: 500 }
      );
    }
  }

  let emailSent = false;
  if (!duplicate) {
    const resend = resendClient();
    if (resend) {
      try {
        const { subject, html } = waitlistConfirmationEmail({ name });
        await resend.emails.send({
          from: resendFrom(),
          to: email,
          subject,
          html,
          reply_to: resendReplyTo()
        });
        emailSent = true;
      } catch {
        // Do not fail the signup if email fails.
        emailSent = false;
      }

      const notify = process.env.WAITLIST_NOTIFY_EMAIL;
      if (notify) {
        try {
          await resend?.emails.send({
            from: resendFrom(),
            to: notify,
            subject: 'New Cosmocrat early access request',
            html: `<div><b>Email:</b> ${email}<br/><b>Name:</b> ${name || ''}<br/><b>First run:</b> ${first_run || ''}<br/><b>utm_campaign:</b> ${row.utm_campaign || ''}</div>`
          });
        } catch {
          // ignore
        }
      }
    }
  }

  return NextResponse.json({ ok: true, duplicate, emailSent });
}
