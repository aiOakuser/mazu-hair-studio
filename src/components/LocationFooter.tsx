import Image from "next/image";
import type { Business } from "@/lib/types";
import { LocationMap } from "@/components/LocationMap";
import { HoursTable } from "@/components/HoursTable";
import { ContactForm } from "@/components/ContactForm";

export function LocationFooter({ business }: { business: Business }) {
  return (
    <section className="border-t border-border bg-surface">
      <div className="w-full px-6 py-12">
        <h2 className="font-display text-xl text-ink mb-6">Location &amp; Hours</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr_0.8fr]">
          <LocationMap mapQuery={business.mapQuery} businessName={business.name} />

          <div className="space-y-1 text-sm">
            <div className="relative mb-3 h-16 aspect-[1008/577] overflow-hidden rounded-xl">
              <Image
                src="/logo.png"
                alt={business.name}
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <p className="font-semibold text-ink">{business.name}</p>
            <p className="text-text-secondary">{business.address}</p>
            <p className="text-text-secondary">{business.phone}</p>
            <a href={`mailto:${business.email}`} className="block text-text-secondary hover:text-accent">
              {business.email}
            </a>
            <a
              href={business.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-accent hover:text-accent-hover hover:underline"
            >
              Get directions
            </a>
          </div>

          <HoursTable hours={business.hours} />
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-xl text-ink mb-4">Cancellation Policy</h2>
          <div className="max-w-2xl space-y-3 text-sm text-text-secondary">
            {business.cancellationPolicy.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-display text-xl text-ink mb-4">Contact us</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
