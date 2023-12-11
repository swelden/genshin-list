import * as React from "react";

import type { Attributes, CharacterSortKeys } from "@/data/types";
import { Button } from "@/components/ui/button";
import { FilterSheet } from "@/components/filters/filter-sheet";
import { Search } from "@/components/filters/search-filter";
import { SortDropdown } from "@/components/filters/sort-filter";
import { Icons } from "@/components/icons";

type FiltersProps = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSortKey: React.Dispatch<React.SetStateAction<CharacterSortKeys>>;
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
};

export function FilterHub({
  setFilter,
  setSortKey,
  setIsReversed,
  attrFilter,
  setAttrFilter,
}: FiltersProps) {
  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-2">
      <Search setFilter={setFilter} />
      {/* TODO: update mobile styles */}
      <div className="flex gap-4">
        <FilterSheet attrFilter={attrFilter} setAttrFilter={setAttrFilter} />
        <SortDropdown setSortKey={setSortKey} className="w-full" />
        <ReverseBtn setIsReversed={setIsReversed} className="" />
      </div>
    </div>
  );
}

interface ReverseBtnProps {
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

function ReverseBtn({ setIsReversed, className }: ReverseBtnProps) {
  return (
    <Button
      onClick={() => setIsReversed((prev) => !prev)}
      aria-label="Reverse"
      className={className}
      size={"icon"}
    >
      <Icons.reverse className="h-7 w-7" />
    </Button>
  );
}
