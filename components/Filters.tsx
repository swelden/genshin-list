import React from "react";
import { CloseIcon, FilterIcon, ReverseIcon, SearchIcon } from "./icons";

const Filters: React.FC<{
  onSetFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSetFilter }) => {
  return (
    <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2">
      <Search onSetFilter={onSetFilter} />
      <div className="grid grid-cols-4 gap-2 lg:gap-4">
        <FilterButton icon={<FilterIcon />} span={1} />
        <FilterButton icon={<SortDropdown />} span={2} />
        <FilterButton icon={<ReverseIcon />} span={1} />
      </div>
    </div>
  );
};

const SortDropdown = () => {
  return <div className="">Default</div>;
};

const FilterButton: React.FC<{ icon: JSX.Element; span: number }> = ({
  icon,
  span,
}) => {
  return (
    <div
      className={`col-span-${span} flex h-9 cursor-pointer items-center justify-center rounded-full bg-amber-100 shadow-sm`}
    >
      {icon}
    </div>
  );
};

const Search: React.FC<{
  onSetFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ onSetFilter }) => {
  return (
    <div className="flex items-center rounded-full border-2 transition-colors ease-in-out focus-within:border-yellow-500">
      <div className="flex w-10 justify-center">
        <SearchIcon />
      </div>
      <input
        className="w-full bg-transparent py-1.5 pr-2 leading-tight outline-none"
        type="text"
        aria-label="Search"
        placeholder="Search for characters..."
        onChange={onSetFilter}
      />
      <div className="flex w-10 cursor-pointer justify-center">
        {/* TODO: make CloseIcon hidden if input text is empty string */}
        <CloseIcon />
      </div>
    </div>
  );
};

export default Filters;
