"use client";

import { Check } from "lucide-react";

import type { FilterAttribute, FilterAttributes } from "@/data/types";
import { cn } from "@/lib/utils";
import { useAttrFilter } from "@/hooks/use-characters";

interface FilterButtonProps {
  attr: FilterAttribute;
  category: keyof FilterAttributes;
}

export function FilterButton({ attr, category }: FilterButtonProps) {
  const [attrFilter, setAttrFilter] = useAttrFilter();
  const handleFilter = (attr: FilterAttribute) => {
    const newSet = new Set<FilterAttribute>(attrFilter[category]);

    newSet.has(attr) ? newSet.delete(attr) : newSet.add(attr);

    setAttrFilter({ ...attrFilter, [category]: newSet });
  };

  const isSelected = (attrFilter[category] as Set<FilterAttribute>).has(attr);

  return (
    <button
      key={attr}
      onClick={() => handleFilter(attr)}
      className={cn(
        "flex h-12 flex-nowrap items-center gap-3 overflow-hidden whitespace-nowrap border-2 border-sheet-btn-border px-3 text-left text-base text-genshin-brown outline-none ring-offset-secondary transition active:!ring-0 hocus:ring-4 hocus:ring-white md:h-16 md:text-xl",
        isSelected &&
          "border-sheet-btn-border-selected bg-genshin-brown text-genshin-blue ring-2 ring-genshin-brown",
      )}
    >
      {/* need to position absolute to transition border color on circle */}
      <div className="relative hidden aspect-square h-7 w-7 md:block">
        <Check
          className={cn(
            "absolute inset-0 h-full w-full text-icon-green",
            !isSelected && "hidden",
          )}
          strokeWidth="3"
        />
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-full border-2 border-sheet-btn-border transition-colors",
            isSelected && "h-0 w-0 scale-0 border-genshin-brown",
          )}
        />
      </div>

      {attr === "4" || attr === "5" ? `${attr}-Star` : attr}
    </button>
  );
}
