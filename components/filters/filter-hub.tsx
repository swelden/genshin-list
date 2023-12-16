import { FilterSheet } from "@/components/filters/filter-sheet";
import { ReverseBtn } from "@/components/filters/reverse-button";
import { Search } from "@/components/filters/search-filter";
import { SortDropdown } from "@/components/filters/sort-filter";

type FiltersProps = {};

export function FilterHub({}: FiltersProps) {
  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-2">
      <Search />
      {/* TODO: update mobile styles */}
      <div className="flex gap-4">
        <FilterSheet />
        <SortDropdown className="w-full" />
        <ReverseBtn className="" />
      </div>
    </div>
  );
}
