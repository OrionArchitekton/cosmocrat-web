export function waitlistConfirmationEmail(opts: { name?: string | null }) {
  const firstName = opts.name?.trim().split(' ')[0];
  const greeting = firstName ? `Hey ${escapeHtml(firstName)},` : 'Hey,';

  const subject = 'You’re on the Cosmocrat waitlist';

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background:#0E131D; color:#E6EDF7; padding:24px">
    <div style="max-width:560px; margin:0 auto; border:1px solid rgba(255,255,255,0.12); border-radius:12px; overflow:hidden">
      <div style="padding:22px; background:rgba(255,255,255,0.04)">
        <div style="font-size:14px; letter-spacing:0.06em; text-transform:uppercase; color:rgba(230,237,247,0.72)">Cosmocrat</div>
        <h1 style="margin:10px 0 0; font-size:22px; line-height:1.25">${greeting}</h1>
      </div>
      <div style="padding:22px">
        <p style="margin:0 0 14px; color:rgba(230,237,247,0.9)">You’re on the waitlist. We’ll reach out as early access opens.</p>
        <p style="margin:0 0 14px; color:rgba(230,237,247,0.72)">
          Cosmocrat is being built around a simple idea: intelligence should persist across time — privately, and under your ownership.
        </p>
        <p style="margin:0 0 14px; color:rgba(230,237,247,0.72)">
          If you have a use case you want us to prioritize, just reply to this email.
        </p>
        <div style="margin-top:18px; padding-top:14px; border-top:1px solid rgba(255,255,255,0.12)">
          <p style="margin:0; font-size:12px; color:rgba(230,237,247,0.6)">To be removed, reply with <b>REMOVE</b>.</p>
        </div>
      </div>
    </div>
  </div>
  `;

  return { subject, html };
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
