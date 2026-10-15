// libs/brevo.ts
// Server-only: this module reads BREVO_API_KEY. Importing it from a Client
// Component is a build error, which is what we want.
import "server-only";

type Contact = { email: string; name?: string };

type SendArgs = {
  to: Contact[];
  subject: string;
  html: string;
  replyTo?: Contact;
};

export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey) throw new Error("BREVO_API_KEY is not set");
  if (!sender) throw new Error("BREVO_SENDER_EMAIL is not set");
  if (!to.length) throw new Error("sendEmail called with no recipients");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: "Webtech Ninjas", email: sender },
      to,
      subject,
      htmlContent: html,
      ...(replyTo ? { replyTo } : {}),
    }),
  });

  if (!res.ok) {
    throw new Error(`Brevo ${res.status}: ${await res.text()}`);
  }
}

/** Escape untrusted form input before dropping it into an email template. */
export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
