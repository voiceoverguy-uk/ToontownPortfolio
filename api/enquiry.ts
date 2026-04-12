import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().refine(
    (val) => val.trim().split(/\s+/).filter(Boolean).length >= 8,
    { message: 'Please write at least 8 words in your message' }
  ),
  pageTitle: z.string(),
  pageUrl: z.string(),
  website: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return res.status(422).json({ error: 'Validation failed', fieldErrors });
  }

  const { name, email, message, pageTitle, pageUrl, website } = parsed.data;

  if (website) {
    return res.status(200).json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error('Missing environment variables for email');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const resend = new Resend(apiKey);

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? 'Unknown';
  const timestamp = new Date().toUTCString();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry — ArabellaHarris.com</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Nunito,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.12);">

          <!-- Header banner -->
          <tr>
            <td style="padding:0;">
              <img
                src="https://www.arabellaharris.com/assets/arabella-harris-navigation-bar_1757607955178-BVIdKgGs.jpg"
                alt="Arabella Harris"
                width="600"
                style="display:block;width:100%;max-width:600px;height:auto;"
              />
            </td>
          </tr>

          <!-- Accent bar -->
          <tr>
            <td style="background:#e50014;height:6px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 24px;">
              <h1 style="margin:0 0 8px;font-size:22px;color:#e50014;font-weight:800;">New Enquiry</h1>
              <p style="margin:0 0 24px;font-size:13px;color:#888;">Received via <a href="${pageUrl}" style="color:#e50014;text-decoration:none;">${pageTitle}</a></p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:120px;vertical-align:top;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:#888;letter-spacing:0.5px;">Name</span>
                  </td>
                  <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                    <span style="font-size:15px;color:#222;font-weight:600;">${escapeHtml(name)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:120px;vertical-align:top;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:#888;letter-spacing:0.5px;">Email</span>
                  </td>
                  <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                    <a href="mailto:${escapeHtml(email)}" style="font-size:15px;color:#e50014;font-weight:600;text-decoration:none;">${escapeHtml(email)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;width:120px;vertical-align:top;">
                    <span style="font-size:12px;font-weight:700;text-transform:uppercase;color:#888;letter-spacing:0.5px;">Message</span>
                  </td>
                  <td style="padding:10px 0 10px 16px;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                    <span style="font-size:15px;color:#222;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</span>
                  </td>
                </tr>
              </table>

              <!-- Meta -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#f9f9f9;border-radius:8px;padding:16px;border-collapse:collapse;">
                <tr>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#aaa;">IP Address: </span>
                    <span style="font-size:12px;color:#666;">${escapeHtml(ip)}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#aaa;">Time: </span>
                    <span style="font-size:12px;color:#666;">${timestamp}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:4px 0;">
                    <span style="font-size:12px;color:#aaa;">Page: </span>
                    <a href="${escapeHtml(pageUrl)}" style="font-size:12px;color:#e50014;text-decoration:none;">${escapeHtml(pageUrl)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#e50014;padding:16px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.85);">
                ArabellaHarris.com &mdash; Voiceover Enquiry System
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `[ArabellaHarris.com] — Enquiry from ${pageTitle}`,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
