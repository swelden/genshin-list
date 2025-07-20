"use client";

import { Check } from "lucide-react";

import type { FilterAttribute, FilterAttributes } from "@/data/types";
import { cn } from "@/lib/utils";

interface FilterButtonProps {
  attr: FilterAttribute;
  category: keyof FilterAttributes;
  attrFilter: FilterAttributes;
  setAttrFilter: (attrFilter: FilterAttributes) => void;
}

export function FilterButton({
  attr,
  category,
  attrFilter,
  setAttrFilter,
}: FilterButtonProps) {
  const handleFilter = (attr: FilterAttribute) => {
    const newSet = new Set<FilterAttribute>(attrFilter[category]);
    newSet.has(attr) ? newSet.delete(attr) : newSet.add(attr);

    setAttrFilter({ ...attrFilter, [category]: newSet });
  };

  const isChecked = (attrFilter[category] as Set<FilterAttribute>).has(attr);

  return (
    <button
      key={attr}
      onClick={() => handleFilter(attr)}
      className={cn(
        "flex h-12 flex-nowrap items-center gap-3 overflow-hidden whitespace-nowrap border-2 border-sheet-btn-border px-3 text-left text-base text-genshin-brown outline-none ring-offset-secondary transition active:ring-0! hocus:ring-4 hocus:ring-white md:h-16 md:text-xl",
        isChecked &&
          "border-sheet-btn-border-selected bg-genshin-brown text-genshin-blue ring-2 ring-genshin-brown",
      )}
      role="checkbox"
      aria-checked={isChecked}
    >
      {/* need to position absolute to transition border color on circle */}
      <div className="relative hidden aspect-square size-7 md:block">
        <Check
          className={cn(
            "absolute inset-0 size-full text-icon-green",
            !isChecked && "hidden",
          )}
          strokeWidth="3"
        />
        <div
          className={cn(
            "absolute inset-0 size-full rounded-full border-2 border-sheet-btn-border transition-colors",
            isChecked && "size-0 scale-0 border-genshin-brown",
          )}
        />
      </div>

      {attr === "4" || attr === "5" ? `${attr}-Star` : attr}
    </button>
  );
}
