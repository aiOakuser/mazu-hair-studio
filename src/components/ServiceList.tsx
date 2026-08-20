import type { Service } from "@/lib/types";
import { CheckIcon, PlusIcon } from "@/components/icons";
import { ServiceCategoryIcon } from "@/components/serviceIcons";

export function ServiceList({
  category,
  services,
  selectedIds,
  onToggle,
}: {
  category: string;
  services: Service[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-display text-foreground">{category}</h2>
      <p className="mt-1 text-sm text-foreground/70">
        {services.length} service{services.length === 1 ? "" : "s"}
      </p>

      <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
        {services.map((service) => {
          const isSelected = selectedIds.includes(service.id);
          const meta = [service.priceValueLabel, service.durationLabel].filter(Boolean).join(" · ");

          return (
            <li
              key={service.id}
              className="flex items-start justify-between gap-4 p-5 transition-colors hover:bg-surface-hover"
            >
              <div className="flex min-w-0 gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <ServiceCategoryIcon category={service.category} />
                </span>

                <div className="min-w-0">
                  <p className="font-medium text-ink">{service.name}</p>
                  <p className="mt-0.5 text-sm text-text-secondary">{service.priceLabel}</p>
                  {service.description && (
                    <p className="mt-2 max-w-prose text-sm text-text-secondary line-clamp-2">
                      {service.description}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-text-secondary">{meta}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onToggle(service.id)}
                aria-pressed={isSelected}
                aria-label={isSelected ? `Remove ${service.name}` : `Add ${service.name}`}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  isSelected
                    ? "border-accent bg-accent text-ink-on-fill"
                    : "border-border text-ink hover:border-accent hover:text-accent"
                }`}
              >
                {isSelected ? <CheckIcon /> : <PlusIcon />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
