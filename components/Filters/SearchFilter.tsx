import { useState } from "react";
import { CloseIcon, SearchIcon } from "../icons";

type SearchProps = React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}>;

const Search: SearchProps = ({ setFilter }) => {
  const [value, setValue] = useState("");

  // Input Field handler
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setFilter(e.target.value);
  };

  // Reset Input Field handler
  const resetInputField = () => {
    setValue("");
    setFilter("");
  };

  return (
    <div className="flex items-center rounded-full border-2 border-gray-200 transition-colors ease-in-out focus-within:border-yellow-500 dark:border-ui-contrast dark:focus-within:border-yellow-600">
      <div className="flex w-10 justify-center text-ui-contrast dark:text-gray-200">
        <SearchIcon />
      </div>
      <input
        className="w-full bg-transparent py-1.5 pr-2 leading-tight outline-none"
        type="text"
        aria-label="Search"
        placeholder="Search for characters..."
        value={value}
        onChange={handleUserInput}
        spellCheck="false"
      />
      <div
        className="flex w-10 cursor-pointer justify-center text-ui-contrast dark:text-gray-200"
        onClick={resetInputField}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default Search;
