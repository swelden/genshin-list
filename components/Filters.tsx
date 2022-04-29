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
    <div className="col-span-1 flex h-9 cursor-pointer items-center justify-center rounded-full border-white bg-ui text-ui-contrast shadow-sm hover:border-2 hover:shadow-inner">
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
        className="flex h-9 w-full cursor-pointer items-center justify-between rounded-full border-0 border-white bg-ui pl-5 pr-3 font-medium text-ui-contrast shadow-sm hover:border-2 hover:shadow-inner focus:border-2 focus:shadow-inner"
      >
        <span className="truncate">{options[selectedOption]}</span>
        <DropDownIcon />
      </button>
      {isOpen && (
        <ul className="absolute top-[2.15rem] z-10 w-full cursor-pointer overflow-hidden rounded-2xl bg-ui-contrast">
          {options.map((option, index) => (
            <li
              className="group p-0.5 py-[0.035rem] first:pt-0.5 last:pb-0.5"
              key={option}
              role="option"
              aria-selected={selectedOption === index}
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                setSelectedOption(index);
              }}
            >
              <div
                className={`rounded-full p-0.5 pl-3 font-medium text-sort-text group-hover:bg-sort-hover-bg group-hover:text-sort-hover-text ${
                  selectedOption === index ? "bg-sort-hover-bg" : ""
                }`}
              >
                {option}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Filters;
