import { sendMail } from "@/lib/mailer";
import { business } from "@/data/business";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please provide a name, valid email, and message." }, { status: 400 });
  }

  try {
    await sendMail({
      to: business.email,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return Response.json({ error: "Could not send your message. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
