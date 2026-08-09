"use client";

import { useState } from "react";
import { CATEGORIES, PRIMARY_CATEGORY_COUNT } from "@/data/services";
import { ChevronDownIcon } from "@/components/icons";

const PRIMARY = CATEGORIES.slice(0, PRIMARY_CATEGORY_COUNT);
const OVERFLOW = CATEGORIES.slice(PRIMARY_CATEGORY_COUNT);

const tabClasses = (isActive: boolean) =>
  `shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-accent text-ink-on-fill"
      : "bg-surface text-text-secondary border border-border hover:border-accent hover:text-accent"
  }`;

export function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (category: string) => void;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const isOverflowActive = (OVERFLOW as readonly string[]).includes(active);

  return (
    <div
      role="tablist"
      aria-label="Service categories"
      className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1"
    >
      {PRIMARY.map((category) => (
        <button
          key={category}
          type="button"
          role="tab"
          aria-selected={active === category}
          onClick={() => onChange(category)}
          className={tabClasses(active === category)}
        >
          {category}
        </button>
      ))}

      <div className="relative shrink-0">
        <button
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          aria-expanded={moreOpen}
          className={`${tabClasses(isOverflowActive)} inline-flex items-center gap-1`}
        >
          {isOverflowActive ? active : "More"}
          <ChevronDownIcon className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
        </button>

        {moreOpen && (
          <>
            <button
              type="button"
              aria-label="Close category menu"
              className="fixed inset-0 z-10 cursor-default"
              onClick={() => setMoreOpen(false)}
            />
            <div className="absolute left-0 z-20 mt-2 w-56 rounded-2xl border border-border bg-surface py-2 shadow-lg">
              {OVERFLOW.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active === category}
                  onClick={() => {
                    onChange(category);
                    setMoreOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:text-accent ${
                    active === category ? "font-medium text-ink" : "text-text-secondary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
