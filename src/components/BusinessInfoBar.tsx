import type { Business } from "@/lib/types";
import { getOpenStatus } from "@/lib/hours";

export function BusinessInfoBar({ business }: { business: Business }) {
  const openStatus = getOpenStatus(business.hours);

  return (
    <div className="text-sm text-text-secondary space-y-1">
      <p>
        <span>{openStatus}</span>
        <span className="mx-2">•</span>
        <a href={`tel:${business.phone.replace(/[^\d+]/g, "")}`} className="hover:text-ink">
          {business.phone}
        </a>
        <span className="mx-2">•</span>
        <a href={`mailto:${business.email}`} className="hover:text-ink">
          {business.email}
        </a>
      </p>
      <p>
        {business.name} • {business.address}
      </p>
    </div>
  );
}
