import Link from "next/link";
import type { Service } from "@/lib/types";

export function ServiceCard({ service }: { service: Service }) {
  const meta = [service.priceValueLabel, service.durationLabel]
    .filter(Boolean)
    .join(" • ");

  return (
    <article className="border border-border p-5 hover:bg-surface-hover transition-colors">
      <h3 className="font-semibold text-ink text-[15px]">
        <Link href={`#${service.id}`} className="hover:underline">
          {service.name}
        </Link>
      </h3>
      <p className="text-sm text-text-secondary mt-1">{service.priceLabel}</p>
      {service.description && (
        <p className="text-sm text-text-secondary mt-2 line-clamp-3">
          {service.description}
        </p>
      )}
      <div className="mt-4 flex items-end justify-between gap-4">
        <Link
          href={service.bookingHref}
          className="text-sm font-medium text-accent hover:text-accent-hover hover:underline"
        >
          Book now
        </Link>
        <span className="text-xs text-text-secondary whitespace-nowrap">{meta}</span>
      </div>
    </article>
  );
}
