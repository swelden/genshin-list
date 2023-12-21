"use client";

import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useAttrFilter } from "@/hooks/use-characters";
import { DragArea } from "@/components/ui/drag-area";

interface SelectedFiltersProps {
  className?: string;
}

export function SelectedFilters({ className }: SelectedFiltersProps) {
  const [attrFilter, setAttrFilter] = useAttrFilter();
  const filterSets = Object.values(attrFilter) as Set<string>[];

  const isEmpty = filterSets.every((filterSet) => filterSet.size === 0);

  function clearFilters() {
    setAttrFilter({
      element: new Set(),
      weapon: new Set(),
      region: new Set(),
      rarity: new Set(),
    });
  }

  return (
    !isEmpty && (
      <div
        className={cn(
          "relative flex max-w-3xl overflow-hidden rounded-full bg-[#C5C1BA]",
          className,
        )}
      >
        <DragArea>
          <div className="flex gap-1.5 p-1 pr-4">
            {filterSets.map((filterSet) =>
              Array.from(filterSet).map((filter) => (
                <div
                  key={filter}
                  className="rounded-full bg-white px-3 py-1 text-sm text-[#323232]"
                >
                  {filter}
                </div>
              )),
            )}
          </div>
        </DragArea>
        <div className="ml-auto flex p-0.5">
          <button
            className="ml-auto flex h-full flex-nowrap items-center justify-center rounded-full bg-[#323232] px-3 py-1 text-sm text-white"
            onClick={clearFilters}
          >
            <Trash2 className="mr-2 h-4 w-4 text-[#FE5C5C]" />
            Clear
          </button>
        </div>
      </div>
    )
  );
}
