"use client";

import Button from "@/components/button";
import AttributeFilter from "@/components/filters/attr-filter";
import Search from "@/components/filters/search-filter";
import SortDropdown from "@/components/filters/sort-filter";
import { FilterIcon, ReverseIcon } from "@/components/icons";
import { useState } from "react";

type FiltersProps = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSortKey: React.Dispatch<React.SetStateAction<CharacterSortKeys>>;
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
  regions: Nation[];
};

// NOTE: might use memo for components to prevent rerender on isOpen change
export default function FilterHub({
  setFilter,
  setSortKey,
  setIsReversed,
  attrFilter,
  setAttrFilter,
  regions,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-2">
      <Search setFilter={setFilter} />
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 xl:gap-4">
        <SortDropdown
          setSortKey={setSortKey}
          className="col-span-full sm:col-span-2"
        />
        <ReverseBtn
          setIsReversed={setIsReversed}
          className="col-span-2 sm:col-span-1"
        />
        <FilterBtn
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className="col-span-2 sm:col-span-1"
        />
      </div>
      {isOpen && (
        <AttributeFilter
          attrFilter={attrFilter}
          setAttrFilter={setAttrFilter}
          regions={regions}
        />
      )}
    </div>
  );
}

const ReverseBtn: React.FC<{
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}> = ({ setIsReversed, className }) => {
  return (
    <Button
      onClick={() => setIsReversed((prev) => !prev)}
      ariaLabel="Reverse"
      className={className}
    >
      <ReverseIcon />
    </Button>
  );
};

const FilterBtn: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className: string;
}> = ({ isOpen, setIsOpen, className }) => {
  return (
    <Button
      onClick={() => setIsOpen(!isOpen)}
      ariaLabel="Filter"
      ariaExpanded={isOpen}
      className={className}
    >
      <FilterIcon />
    </Button>
  );
};
