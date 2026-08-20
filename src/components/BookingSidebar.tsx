import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Business, Service } from "@/lib/types";
import { getOpenStatus } from "@/lib/hours";
import { HoursTable } from "@/components/HoursTable";
import { ChevronDownIcon, DirectionsIcon, PhoneIcon, PinIcon, XIcon } from "@/components/icons";

export function BookingSidebar({
  business,
  selectedServices,
  onRemove,
}: {
  business: Business;
  selectedServices: Service[];
  onRemove: (id: string) => void;
}) {
  const openStatus = getOpenStatus(business.hours);
  const hasSelection = selectedServices.length > 0;
  const [note, setNote] = useState("");
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const bookingHref = note.trim()
    ? `${business.bookingHref}${business.bookingHref.includes("?") ? "&" : "?"}note=${encodeURIComponent(note.trim())}`
    : business.bookingHref;

  async function submitInquiry(event: FormEvent) {
    event.preventDefault();
    setInquiryStatus("sending");

    try {
      const res = await fetch("/api/booking-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName,
          email: inquiryEmail,
          phone: inquiryPhone,
          note,
          services: selectedServices.map((service) => ({
            name: service.name,
            priceValueLabel: service.priceValueLabel,
            durationLabel: service.durationLabel,
          })),
        }),
      });
      if (!res.ok) throw new Error();
      setInquiryStatus("sent");
    } catch {
      setInquiryStatus("error");
    }
  }

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h2 className="font-display text-xl text-ink">{business.name}</h2>

        <div className="mt-4 flex items-start gap-3 border-t border-border pt-4">
          <span className="mt-0.5 shrink-0 text-accent">
            <PinIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Address</p>
            <p className="text-sm text-ink">{business.address}</p>
          </div>
          <a
            href={business.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get directions"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <DirectionsIcon />
          </a>
        </div>

        <div className="flex items-start gap-3 border-t border-border pt-4 mt-4">
          <span className="mt-0.5 shrink-0 text-accent">
            <PhoneIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Phone</p>
            <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className="text-sm text-ink hover:text-accent">
              {business.phone}
            </a>
          </div>
          <a
            href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
            aria-label="Call the salon"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-ink transition-colors hover:border-accent hover:text-accent"
          >
            <PhoneIcon />
          </a>
        </div>

        <details className="group border-t border-border pt-4 mt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Hours</p>
              <p className="text-sm text-ink">{openStatus}</p>
            </div>
            <ChevronDownIcon className="text-text-secondary transition-transform group-open:rotate-180" />
          </summary>
          <div className="mt-3">
            <HoursTable hours={business.hours} />
          </div>
        </details>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h3 className="font-semibold text-ink">Appointment summary</h3>

        {!hasSelection ? (
          <p className="mt-3 text-sm text-text-secondary">No services added yet</p>
        ) : (
          <ul className="mt-3 space-y-3">
            {selectedServices.map((service) => (
              <li key={service.id} className="flex items-start justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium text-ink">{service.name}</p>
                  <p className="text-xs text-text-secondary">
                    {[service.priceValueLabel, service.durationLabel].filter(Boolean).join(" · ")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(service.id)}
                  aria-label={`Remove ${service.name}`}
                  className="shrink-0 text-text-secondary transition-colors hover:text-accent"
                >
                  <XIcon />
                </button>
              </li>
            ))}
          </ul>
        )}

        {hasSelection && (
          <div className="mt-4">
            <label htmlFor="appointment-note" className="text-xs font-medium uppercase tracking-wide text-text-secondary">
              Note (optional)
            </label>
            <textarea
              id="appointment-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Anything we should know?"
              rows={2}
              className="mt-1.5 w-full resize-none rounded-xl border border-border p-2.5 text-sm text-ink placeholder:text-text-secondary focus:border-accent focus:outline-none"
            />
          </div>
        )}

        {hasSelection ? (
          <Link
            href={bookingHref}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-on-fill transition-colors hover:bg-accent"
          >
            Next
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-border px-6 py-3 text-sm font-medium text-text-secondary"
          >
            Next
          </button>
        )}

        {hasSelection && inquiryStatus !== "sent" && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setInquiryOpen((prev) => !prev)}
              className="text-xs text-text-secondary underline-offset-2 hover:text-accent hover:underline"
            >
              Prefer not to book online? Request by email instead
            </button>

            {inquiryOpen && (
              <form onSubmit={submitInquiry} className="mt-3 space-y-2.5">
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={inquiryName}
                  onChange={(e) => setInquiryName(e.target.value)}
                  className="w-full rounded-xl border border-border p-2.5 text-sm text-ink placeholder:text-text-secondary focus:border-accent focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={inquiryEmail}
                  onChange={(e) => setInquiryEmail(e.target.value)}
                  className="w-full rounded-xl border border-border p-2.5 text-sm text-ink placeholder:text-text-secondary focus:border-accent focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={inquiryPhone}
                  onChange={(e) => setInquiryPhone(e.target.value)}
                  className="w-full rounded-xl border border-border p-2.5 text-sm text-ink placeholder:text-text-secondary focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={inquiryStatus === "sending"}
                  className="inline-flex w-full items-center justify-center rounded-full border border-foreground/40 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {inquiryStatus === "sending" ? "Sending…" : "Send request"}
                </button>
                {inquiryStatus === "error" && (
                  <p className="text-sm text-red-600">Could not send your request. Please try again or call us.</p>
                )}
              </form>
            )}
          </div>
        )}

        {inquiryStatus === "sent" && (
          <p className="mt-3 text-sm text-text-secondary">
            Thanks — we&apos;ll reach out to confirm your appointment.
          </p>
        )}
      </div>

      <Link
        href={business.myBookingsHref}
        className="inline-flex w-full items-center justify-center rounded-full border border-foreground/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        Sign in
      </Link>
    </aside>
  );
}
