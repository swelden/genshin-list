import React, { useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import {
  CloseIcon,
  DropDownIcon,
  FilterIcon,
  ReverseIcon,
  SearchIcon,
} from "./icons";

const Filters: React.FC<{
  onSetFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSetFilter }) => {
  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2">
      <Search onSetFilter={onSetFilter} />
      <div className="grid grid-cols-4 gap-2 lg:gap-4">
        <FilterButton icon={<FilterIcon />} />
        <FilterDropdown />
        <FilterButton icon={<ReverseIcon />} />
      </div>
    </div>
  );
};

const Search: React.FC<{
  onSetFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSetFilter }) => {
  return (
    <div className="flex items-center rounded-full border-2 transition-colors ease-in-out focus-within:border-yellow-500">
      <div className="flex w-10 justify-center text-ui-contrast">
        <SearchIcon />
      </div>
      <input
        className="w-full bg-transparent py-1.5 pr-2 leading-tight outline-none"
        type="text"
        aria-label="Search"
        placeholder="Search for characters..."
        onChange={onSetFilter}
      />
      <div className="flex w-10 cursor-pointer justify-center text-ui-contrast">
        {/* TODO: make CloseIcon hidden if input text is empty string */}
        <CloseIcon />
      </div>
    </div>
  );
};

const FilterButton: React.FC<{ icon: JSX.Element }> = ({ icon }) => {
  return (
    <div className="col-span-1 flex h-9 cursor-pointer items-center justify-center rounded-full bg-ui text-ui-contrast shadow-sm">
      {icon}
    </div>
  );
};

const options = ["Sort by Elemental Type", "Sort by Weapon Type", "Default"];

const FilterDropdown = () => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options.length - 1);

  const handleClickOutside = () => {
    // Your custom logic here
    // console.log("clicked outside");
    setIsOpen(false);
  };

  const handleClickInside = () => {
    // Your custom logic here
    // console.log("clicked inside");
    setIsOpen(!isOpen);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className="relative col-span-2">
      <button
        onClick={handleClickInside}
        className="flex h-9 w-full cursor-pointer items-center justify-between rounded-full bg-ui pl-5 pr-3 font-medium text-ui-contrast shadow-sm"
      >
        <span className="truncate">{options[selectedOption]}</span>
        <DropDownIcon />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full cursor-pointer overflow-hidden rounded-2xl bg-yellow-100">
          {options.map((option, index) => (
            <li
              className="p-2 hover:bg-yellow-200"
              key={option}
              role="option"
              aria-selected={selectedOption == index}
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                setSelectedOption(index);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filters;
