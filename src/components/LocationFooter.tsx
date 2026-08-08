import type { Business } from "@/lib/types";
import { LocationMap } from "@/components/LocationMap";
import { HoursTable } from "@/components/HoursTable";

export function LocationFooter({ business }: { business: Business }) {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-lg font-semibold text-ink mb-6">Location &amp; Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_0.8fr] gap-8">
          <LocationMap mapQuery={business.mapQuery} businessName={business.name} />

          <div className="text-sm space-y-1">
            <p className="font-semibold text-ink">{business.name}</p>
            <p className="text-text-secondary">{business.address}</p>
            <p className="text-text-secondary">{business.phone}</p>
            <a href={`mailto:${business.email}`} className="text-text-secondary hover:text-ink block">
              {business.email}
            </a>
            <a
              href={business.directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover hover:underline inline-block mt-2"
            >
              Get directions
            </a>
          </div>

          <HoursTable hours={business.hours} />
        </div>
      </div>
    </section>
  );
}
