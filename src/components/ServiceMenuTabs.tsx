"use client";

import { useState } from "react";
import type { Service, StaffMember } from "@/lib/types";
import { ServiceGrid } from "@/components/ServiceGrid";
import { StaffPanel } from "@/components/StaffPanel";

type TabId = "services" | "staff";

const TABS: { id: TabId; label: string }[] = [
  { id: "services", label: "Services" },
  { id: "staff", label: "Staff" },
];

export function ServiceMenuTabs({
  services,
  staff,
}: {
  services: Service[];
  staff: StaffMember[];
}) {
  const [activeTab, setActiveTab] = useState<TabId>("services");

  return (
    <div>
      <div role="tablist" className="flex gap-6 border-b border-border">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 text-sm border-b-2 -mb-px transition-colors ${
                isActive
                  ? "border-ink text-ink font-medium"
                  : "border-transparent text-text-secondary hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id="services-panel"
        role="tabpanel"
        hidden={activeTab !== "services"}
        className="pt-6"
      >
        <ServiceGrid services={services} />
      </div>

      <div id="staff-panel" role="tabpanel" hidden={activeTab !== "staff"} className="pt-6">
        <StaffPanel staff={staff} />
      </div>
    </div>
  );
}
