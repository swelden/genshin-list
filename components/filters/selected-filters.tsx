"use client";

import { Trash2 } from "lucide-react";

import { getInitialFilterAttributes } from "@/data/constants";
import { cn } from "@/lib/utils";
import { useAttrFilter } from "@/hooks/use-characters";
import { Button } from "@/components/ui/button";
import { DragArea } from "@/components/ui/drag-area";

interface SelectedFiltersProps {
  className?: string;
}

export function SelectedFilters({ className }: SelectedFiltersProps) {
  const [attrFilter, setAttrFilter] = useAttrFilter();
  const filterSets = Object.values(attrFilter) as Set<string>[];

  const isEmpty = filterSets.every((filterSet) => filterSet.size === 0);

  function clearFilters() {
    setAttrFilter(getInitialFilterAttributes());
  }

  return (
    !isEmpty && (
      <div
        className={cn(
          "relative flex h-9 max-w-3xl overflow-hidden rounded-full bg-[#C5C1BA]",
          className,
        )}
      >
        <DragArea>
          <div className="flex h-full items-center gap-1.5 p-1 pr-4">
            {filterSets.map((filterSet) =>
              Array.from(filterSet).map((filter) => (
                <FilterIndicator key={filter} filter={filter} />
              )),
            )}
            <EndPadding />
          </div>
        </DragArea>
        <div className="relative ml-auto flex p-0.5">
          <BlurEffect />
          <Button
            onClick={clearFilters}
            variant="dark"
            size="xsmall"
            className="h-full pl-1"
          >
            <div className="mr-2 flex aspect-square h-full items-center justify-center rounded-full bg-btn-dark">
              <Trash2 className="h-4 w-4 text-icon-red" />
            </div>
            Clear
          </Button>
        </div>
      </div>
    )
  );
}

function FilterIndicator({ filter }: { filter: string }) {
  return (
    <div className="flex h-full items-center justify-center whitespace-nowrap rounded-full bg-btn-dark-foreground px-3 text-sm text-btn-dark">
      {filter === "4" || filter === "5" ? `${filter}-Star` : filter}
    </div>
  );
}

function BlurEffect() {
  return (
    // make sure -left-[x] is equal to w-[x]
    <div className="absolute -left-3 top-0 h-full w-3 bg-gradient-to-l from-[#C5C1BA]" />
  );
}

// to prevent last item from hiding in drag area
function EndPadding() {
  return (
    <div className="min-h-[1px] min-w-[1px] bg-transparent px-2">&nbsp;</div>
  );
}
