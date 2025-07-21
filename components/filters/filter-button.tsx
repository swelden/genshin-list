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
        "border-sheet-btn-border text-genshin-brown ring-offset-secondary hocus:ring-4 hocus:ring-white flex h-12 flex-nowrap items-center gap-3 overflow-hidden border-2 px-3 text-left text-base whitespace-nowrap transition outline-none active:ring-0! md:h-16 md:text-xl",
        isChecked &&
          "border-sheet-btn-border-selected bg-genshin-brown text-genshin-blue ring-genshin-brown ring-2",
      )}
      role="checkbox"
      aria-checked={isChecked}
    >
      {/* need to position absolute to transition border color on circle */}
      <div className="relative hidden aspect-square size-7 md:block">
        <Check
          className={cn(
            "text-icon-green absolute inset-0 size-full",
            !isChecked && "hidden",
          )}
          strokeWidth="3"
        />
        <div
          className={cn(
            "border-sheet-btn-border absolute inset-0 size-full rounded-full border-2 transition-colors",
            isChecked && "border-genshin-brown size-0 scale-0",
          )}
        />
      </div>

      {attr === "4" || attr === "5" ? `${attr}-Star` : attr}
    </button>
  );
}
