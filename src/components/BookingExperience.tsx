"use client";

import { useMemo, useState } from "react";
import type { Business, Service } from "@/lib/types";
import { CATEGORIES } from "@/data/services";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ServiceList } from "@/components/ServiceList";
import { BookingSidebar } from "@/components/BookingSidebar";

export function BookingExperience({
  services,
  business,
}: {
  services: Service[];
  business: Business;
}) {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const visibleServices = useMemo(
    () => services.filter((service) => service.category === activeCategory),
    [services, activeCategory]
  );

  const selectedServices = useMemo(
    () => services.filter((service) => selectedIds.includes(service.id)),
    [services, selectedIds]
  );

  function toggleService(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
        <div className="mt-6">
          <ServiceList
            category={activeCategory}
            services={visibleServices}
            selectedIds={selectedIds}
            onToggle={toggleService}
          />
        </div>
      </div>

      <BookingSidebar business={business} selectedServices={selectedServices} onRemove={toggleService} />
    </div>
  );
}
