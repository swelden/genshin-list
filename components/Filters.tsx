import React from "react";
import { CloseIcon, FilterIcon, ReverseIcon, SearchIcon } from "./icons";

const Filters = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <Search />
      <div className="flex items-center gap-4">
        <FilterButton icon={<FilterIcon />} />
        <FilterButton icon={<SortDropdown />} />
        <FilterButton icon={<ReverseIcon />} />
      </div>
    </div>
  );
};

const SortDropdown = () => {
  return <div className="">Default</div>;
};

const FilterButton: React.FC<{ icon: JSX.Element }> = ({ icon }) => {
  return (
    <div className="flex h-9 cursor-pointer items-center justify-center rounded-full bg-amber-100 px-5 shadow-sm">
      {icon}
    </div>
  );
};

const Search = () => {
  return (
    <div className="flex w-full items-center rounded-full border-2 transition-colors ease-in-out focus-within:border-yellow-500">
      <div className="flex w-10 justify-center">
        <SearchIcon />
      </div>
      <input
        className="w-full bg-transparent py-1.5 pr-2 leading-tight outline-none"
        type="text"
        aria-label="Search"
        placeholder="Search for characters..."
      />
      <div className="flex w-10 cursor-pointer justify-center">
        {/* TODO: make CloseIcon hidden if input text is empty string */}
        <CloseIcon />
      </div>
    </div>
  );
};

export default Filters;
