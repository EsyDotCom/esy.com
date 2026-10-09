/* Beehiiv as a silent backup while Resend proves itself (2026-10-09). Only
   people who confirmed are copied over, and Beehiiv is told to send nothing
   (no confirmation, no welcome), so nobody gets two of anything. Best effort:
   a Beehiiv failure is logged and never fails the confirmation. Delete this
   file, and its one caller, once Resend is verified in production. */

export async function mirrorToBeehiiv(email, attribution, firstName) {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return;

  const customFields = [
    { name: 'Name', value: firstName || '' },
    { name: 'Signup Source', value: attribution.signupSource },
  ].filter((f) => f.value);

  const base = {
    email,
    double_opt_override: 'off',
    send_welcome_email: false,
    reactivate_existing: true,
    referring_site: attribution.referringSite,
    utm_source: 'esy_website',
    utm_medium: 'organic',
    ...attribution.campaign,
  };

  const send = (body) => fetch(`https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify(body),
  });

  try {
    let res = await send(customFields.length ? { ...base, custom_fields: customFields } : base);
    // Beehiiv 400s on a custom field the publication doesn't have; the copy
    // matters more than the metadata.
    if (res.status === 400 && customFields.length) res = await send(base);
    if (!res.ok && res.status !== 409) console.warn('[newsletter] Beehiiv backup copy failed:', res.status);
  } catch (error) {
    console.warn('[newsletter] Beehiiv backup copy failed:', error?.message);
  }
}
