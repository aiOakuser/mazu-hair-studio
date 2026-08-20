import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT ?? 587);
  const user = process.env.EMAIL_HOST_USER;
  const pass = process.env.EMAIL_HOST_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured: EMAIL_HOST, EMAIL_HOST_USER, and EMAIL_HOST_PASSWORD must be set."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.EMAIL_USE_TLS === "false" ? false : port === 465,
    auth: { user, pass },
  });

  return transporter;
}

export async function sendMail({
  subject,
  text,
  replyTo,
  to,
}: {
  subject: string;
  text: string;
  replyTo?: string;
  to?: string;
}) {
  const from = process.env.EMAIL_FROM || process.env.EMAIL_HOST_USER;
  const recipient = to || process.env.CONTACT_EMAIL_TO;

  if (!recipient) {
    throw new Error("No recipient configured: pass `to` or set CONTACT_EMAIL_TO.");
  }

  await getTransporter().sendMail({
    from,
    to: recipient,
    replyTo,
    subject,
    text,
  });
}
