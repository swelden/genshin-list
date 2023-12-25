"use client";

import { useAttrFilter } from "@/hooks/use-characters";
import { FilterSheet } from "@/components/filters/filter-sheet";
import { ReverseBtn } from "@/components/filters/reverse-button";
import { Search } from "@/components/filters/search-filter";
import { SelectedFilters } from "@/components/filters/selected-filters";
import { SortDropdown } from "@/components/filters/sort-filter";

type FilterHubProps = {};

export function FilterHub({}: FilterHubProps) {
  const [attrFilter, setAttrFilter] = useAttrFilter();

  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-2">
      <Search />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-[auto_1fr_auto] sm:gap-4">
        <FilterSheet className="hidden sm:flex" />
        <SortDropdown className="col-span-full w-full sm:col-span-1" />
        <FilterSheet className="flex w-full sm:hidden" />
        <ReverseBtn className="w-full" />
      </div>
      <SelectedFilters
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
        className="col-span-full mx-auto w-full"
      />
    </div>
  );
}
