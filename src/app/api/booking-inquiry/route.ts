import { sendMail } from "@/lib/mailer";
import { business } from "@/data/business";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface InquiryService {
  name: string;
  priceValueLabel?: string;
  durationLabel?: string;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const note = typeof body?.note === "string" ? body.note.trim() : "";
  const services: InquiryService[] = Array.isArray(body?.services)
    ? body.services.filter((s: unknown): s is InquiryService => typeof (s as InquiryService)?.name === "string")
    : [];

  if (!name || !EMAIL_RE.test(email) || services.length === 0) {
    return Response.json(
      { error: "Please provide a name, valid email, and at least one service." },
      { status: 400 }
    );
  }

  const serviceLines = services
    .map((s) => `- ${s.name}${[s.priceValueLabel, s.durationLabel].filter(Boolean).length ? ` (${[s.priceValueLabel, s.durationLabel].filter(Boolean).join(" · ")})` : ""}`)
    .join("\n");

  const lines = [
    `New booking request from ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    "Requested services:",
    serviceLines,
    note ? `\nNote: ${note}` : null,
  ].filter((line) => line !== null);

  try {
    await sendMail({
      to: business.email,
      replyTo: email,
      subject: `Booking request from ${name}`,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("Failed to send booking inquiry email:", error);
    return Response.json({ error: "Could not send your request. Please try again later." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
