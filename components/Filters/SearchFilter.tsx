import { useState } from "react";
import { CloseIcon, SearchIcon } from "../icons";

const Search: React.FC<{
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setFilter }) => {
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
    <div className="flex items-center rounded-full border-2 transition-colors ease-in-out focus-within:border-yellow-500">
      <div className="flex w-10 justify-center text-ui-contrast">
        <SearchIcon />
      </div>
      <input
        className="w-full bg-transparent py-1.5 pr-2 leading-tight outline-none"
        type="text"
        aria-label="Search"
        placeholder="Search for characters..."
        value={value}
        onChange={handleUserInput}
      />
      <div
        className="flex w-10 cursor-pointer justify-center text-ui-contrast"
        onClick={resetInputField}
      >
        <CloseIcon />
      </div>
    </div>
  );
};

export default Search;
