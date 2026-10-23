import nodemailer from "nodemailer";
import { LeadPayload } from "./types";

interface EmailResult {
  success: boolean;
  method: string;
  recipient: string;
  error?: string;
  messageId?: string;
}

/**
 * Format phone number for WhatsApp wa.me link
 */
function cleanPhoneForWhatsApp(phone: string): string {
  return phone.replace(/[^\d]/g, "");
}

/**
 * Render responsive HTML email template for internal notification
 */
export function renderLeadEmailHtml(lead: LeadPayload): string {
  const cleanPhone = cleanPhoneForWhatsApp(lead.phone);
  const waLink = cleanPhone.length >= 8 ? `https://wa.me/${cleanPhone}` : null;
  const focusPills = Array.isArray(lead.focus) && lead.focus.length > 0
    ? lead.focus
      .map(
        (f) =>
          `<span style="display:inline-block;background:#F3F4F6;color:#1F2937;padding:5px 12px;border-radius:16px;font-size:12px;font-weight:600;margin:3px 4px 3px 0;">${escapeHtml(f)}</span>`
      )
      .join("")
    : `<span style="color:#6B7280;font-style:italic;">None specified</span>`;

  const dateStr = lead.submittedAt
    ? new Date(lead.submittedAt).toUTCString()
    : new Date().toUTCString();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Beacon AI Lead</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#F5F6F8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111827;line-height:1.5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#F5F6F8;padding:32px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" style="max-width:600px;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);border:1px solid #E5E7EB;" cellspacing="0" cellpadding="0">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#0D0E12;padding:28px 32px;border-bottom:3px solid #FF5722;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <span style="display:inline-block;color:#FF5722;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:6px;">
                      ✦ NEW AUDIT REQUEST
                    </span>
                    <h1 style="margin:0;color:#FFFFFF;font-size:22px;font-weight:800;letter-spacing:-0.5px;">
                      Beacon AI Lead Alert
                    </h1>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <span style="display:inline-block;background:rgba(255,87,34,0.15);color:#FF5722;border:1px solid rgba(255,87,34,0.3);padding:4px 10px;border-radius:20px;font-size:11px;font-weight:700;">
                      ${escapeHtml(lead.source || "Website")}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Overview Card -->
          <tr>
            <td style="padding:28px 32px 16px 32px;">
              <h2 style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#111827;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #E5E7EB;padding-bottom:8px;">
                Contact Details
              </h2>
              <table role="presentation" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td width="35%" style="padding:8px 0;color:#6B7280;font-size:13px;font-weight:600;">Full Name:</td>
                  <td style="padding:8px 0;color:#111827;font-size:15px;font-weight:700;">${escapeHtml(lead.name)}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6B7280;font-size:13px;font-weight:600;">Work Email:</td>
                  <td style="padding:8px 0;">
                    <a href="mailto:${escapeHtml(lead.email)}" style="color:#FF5722;font-size:14px;font-weight:600;text-decoration:none;">
                      ${escapeHtml(lead.email)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6B7280;font-size:13px;font-weight:600;">Mobile / WhatsApp:</td>
                  <td style="padding:8px 0;font-size:14px;color:#111827;font-weight:600;">
                    ${escapeHtml(lead.phone)}
                    ${waLink
      ? `&nbsp;&nbsp;<a href="${waLink}" target="_blank" style="display:inline-block;background:#25D366;color:#FFFFFF;text-decoration:none;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;">WhatsApp 💬</a>`
      : ""
    }
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6B7280;font-size:13px;font-weight:600;">Company:</td>
                  <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:700;">${escapeHtml(lead.company)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Company & Qualification Card -->
          <tr>
            <td style="padding:8px 32px 20px 32px;">
              <h2 style="margin:0 0 16px 0;font-size:16px;font-weight:700;color:#111827;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #E5E7EB;padding-bottom:8px;">
                Role & Qualification
              </h2>
              <table role="presentation" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td width="35%" style="padding:8px 0;color:#6B7280;font-size:13px;font-weight:600;">Role:</td>
                  <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(lead.role || "Not specified")}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6B7280;font-size:13px;font-weight:600;">Team Size:</td>
                  <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${escapeHtml(lead.size || "Not specified")}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:#6B7280;font-size:13px;font-weight:600;">Current Systems:</td>
                  <td style="padding:8px 0;color:#111827;font-size:14px;">${escapeHtml(lead.systems || "None provided")}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;vertical-align:top;color:#6B7280;font-size:13px;font-weight:600;">Focus Areas:</td>
                  <td style="padding:8px 0;">
                    ${focusPills}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding:16px 32px 28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <a href="mailto:${escapeHtml(lead.email)}?subject=Re:%20Beacon%20AI%20Audit%20Consultation" style="display:inline-block;background:#FF5722;color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:700;text-align:center;">
                      Reply by Email →
                    </a>
                    ${waLink
      ? `&nbsp;&nbsp;<a href="${waLink}" target="_blank" style="display:inline-block;background:#0D0E12;color:#FFFFFF;text-decoration:none;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:600;border:1px solid #374151;">Open in WhatsApp</a>`
      : ""
    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Metadata -->
          <tr>
            <td style="background:#F9FAFB;padding:16px 32px;border-top:1px solid #E5E7EB;color:#9CA3AF;font-size:12px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>Submitted: ${dateStr}</td>
                  <td align="right">Beacon AI · McCollins Media</td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Escape HTML special chars to prevent injection in email clients
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Send email notification to meghna@mccollinsmedia.com
 */
export async function sendLeadNotificationEmail(lead: LeadPayload): Promise<EmailResult> {
  const recipient =
    process.env.LEAD_NOTIFICATION_EMAIL ||
    "meghna@mccollinsmedia.com, sahad@mccollinsmedia.com";
  const recipientList = recipient
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);
  const fromEmail = process.env.SMTP_FROM || process.env.RESEND_FROM || '"Beacon AI" <leads@beacon.ai>';
  const subject = `🔥 New Beacon AI Lead: ${lead.company} — ${lead.name}`;
  const htmlContent = renderLeadEmailHtml(lead);

  // 1. Check if SMTP configuration is present
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && (smtpUser || process.env.SMTP_PORT)) {
    try {
      const port = Number(process.env.SMTP_PORT || 587);
      const secure = process.env.SMTP_SECURE === "true" || port === 465;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure,
        auth: smtpUser ? { user: smtpUser, pass: smtpPass || "" } : undefined,
      });

      const info = await transporter.sendMail({
        from: fromEmail,
        to: recipient,
        replyTo: lead.email,
        subject,
        html: htmlContent,
      });

      return {
        success: true,
        method: "SMTP",
        recipient,
        messageId: info.messageId,
      };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      console.error("[SMTP Send Error]:", errorStr);
      return {
        success: false,
        method: "SMTP",
        recipient,
        error: errorStr,
      };
    }
  }

  // 2. Check if Resend API key is present
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: recipientList,
          reply_to: lead.email,
          subject,
          html: htmlContent,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const errorMsg = data?.message || `Resend API error: ${res.statusText}`;
        console.error("[Resend API Error]:", data);
        return { success: false, method: "RESEND", recipient, error: errorMsg };
      }

      return {
        success: true,
        method: "RESEND",
        recipient,
        messageId: data?.id,
      };
    } catch (err: unknown) {
      const errorStr = err instanceof Error ? err.message : String(err);
      console.error("[Resend Exception]:", errorStr);
      return { success: false, method: "RESEND", recipient, error: errorStr };
    }
  }

  // 3. Fallback / Dev Mode when no mail credentials are configured yet
  console.warn(
    `[Email Notice] Neither SMTP (SMTP_HOST/SMTP_USER) nor RESEND_API_KEY is configured. Notification intended for ${recipient} was logged:`,
    {
      to: recipient,
      subject,
      replyTo: lead.email,
      lead: {
        name: lead.name,
        company: lead.company,
        phone: lead.phone,
        email: lead.email,
        role: lead.role,
        size: lead.size,
      },
    }
  );

  return {
    success: true,
    method: "DEV_MOCK",
    recipient,
    error: "No SMTP or Resend credentials configured. Logged to console.",
  };
}
