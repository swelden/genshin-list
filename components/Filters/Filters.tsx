import React, { useState } from "react";
import { FilterIcon, ReverseIcon } from "../icons";
import AttributeFilter from "./AttrFilter";
import Button from "./Button";
import Search from "./SearchFilter";
import SortDropdown from "./SortFilter";

// NOTE: might use memo for components to prevent rerender on isOpen change
const Filters: React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFilter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2">
      <Search setFilter={setFilter} />
      <div className="grid grid-cols-4 gap-2 lg:gap-4">
        <Button onClick={() => setIsOpen(!isOpen)}>
          <FilterIcon />
        </Button>
        <SortDropdown />
        <Button onClick={() => console.log("Reverse Clicked")}>
          <ReverseIcon />
        </Button>
      </div>
      {isOpen && <AttributeFilter />}
    </div>
  );
};

export default Filters;
