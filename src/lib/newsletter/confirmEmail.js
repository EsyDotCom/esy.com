/* The confirmation email: one job, one button. Short and in Zev's voice, since
   it's the first thing he ever sends someone. Inline styles only (mail clients
   drop <style> blocks) and a plain-text twin for clients that don't render
   HTML. mail.esy.com has click tracking on, so the button passes through
   Resend's redirect on its way to esy.com; the pass in the link survives it. */

const NAVY = '#0A2540';
const JADE = '#00A896';
const MUTED = '#5b6472';

const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** { subject, html, text } for a confirmation link. */
export function confirmationEmail(link) {
  const href = escapeHtml(link);
  const subject = 'Confirm your email for The Marketing Engineer';

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#ffffff;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${NAVY};line-height:1.6;font-size:16px;">
    <p style="margin:0 0 24px;font-size:20px;font-weight:700;letter-spacing:-0.01em;">One click and you&rsquo;re in.</p>
    <p style="margin:0 0 28px;">Confirm your email and The Marketing Engineer starts arriving: the AI marketing systems I build, how they work, what they did, and the skills to run them yourself.</p>
    <p style="margin:0 0 32px;">
      <a href="${href}" style="display:inline-block;background:${JADE};color:#ffffff;text-decoration:none;font-weight:600;padding:13px 22px;border-radius:10px;">Confirm my email</a>
    </p>
    <p style="margin:0 0 8px;color:${MUTED};font-size:14px;">The link works for 7 days. If you didn&rsquo;t sign up, ignore this and you won&rsquo;t hear from me again.</p>
    <p style="margin:24px 0 0;">Zev</p>
    <p style="margin:32px 0 0;color:${MUTED};font-size:12px;">esy.com &middot; Reply any time, it comes straight to me.</p>
  </div>
</body></html>`;

  const text = [
    'One click and you’re in.',
    '',
    'Confirm your email and The Marketing Engineer starts arriving: the AI marketing systems I build, how they work, what they did, and the skills to run them yourself.',
    '',
    `Confirm my email: ${link}`,
    '',
    'The link works for 7 days. If you didn’t sign up, ignore this and you won’t hear from me again.',
    '',
    'Zev',
  ].join('\n');

  return { subject, html, text };
}

/** Where the confirmation link points: the site that took the signup when it's
 *  one of ours (esy.com, a Vercel preview, localhost while testing), otherwise
 *  esy.com. Checked against known hosts so a forged Host header can't send
 *  someone a link to another site. */
export function confirmLink(request, token) {
  let origin = 'https://esy.com';
  try {
    const { protocol, host, hostname } = new URL(request.url);
    const ours = hostname === 'esy.com' || hostname === 'www.esy.com' || hostname === 'localhost'
      || (hostname.endsWith('.vercel.app') && hostname.includes('esy'));
    if (ours) origin = `${protocol}//${host}`;
  } catch {
    // Keep esy.com.
  }
  return `${origin}/newsletter/confirm/?t=${encodeURIComponent(token)}`;
}
