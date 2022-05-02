import React, { useState } from "react";
import { FilterIcon, ReverseIcon } from "../icons";
import AttributeFilter from "./AttrFilter";
import Button from "./Button";
import Search from "./SearchFilter";
import SortDropdown from "./SortFilter";

type FiltersProps = React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setSortKey: React.Dispatch<React.SetStateAction<CharacterSortKeys>>;
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}>;
// NOTE: might use memo for components to prevent rerender on isOpen change
const Filters: FiltersProps = ({
  setFilter,
  setSortKey,
  setIsReversed,
  attrFilter,
  setAttrFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2">
      <Search setFilter={setFilter} />
      <div className="grid grid-cols-4 gap-2 lg:gap-4">
        <Button onClick={() => setIsOpen(!isOpen)}>
          <FilterIcon />
        </Button>
        <SortDropdown setSortKey={setSortKey} />
        <Button onClick={() => setIsReversed((prev) => !prev)}>
          <ReverseIcon />
        </Button>
      </div>
      {isOpen && (
        <AttributeFilter
          attrFilter={attrFilter}
          setAttrFilter={setAttrFilter}
        />
      )}
    </div>
  );
};

export default Filters;
