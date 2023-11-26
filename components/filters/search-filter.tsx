import { Icons } from "@/components/icons";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

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
    <div className="flex h-11 items-center rounded-full border-2 border-zinc-300 transition-colors ease-in-out focus-within:border-blue-600 dark:border-primary-foreground dark:focus-within:border-yellow-600">
      <div className="flex w-10 justify-center text-primary-foreground dark:text-zinc-300">
        <SearchIcon className="h-4 w-4" />
      </div>
      <input
        className="w-full bg-background py-1.5 pr-2 leading-tight text-foreground outline-none"
        type="text"
        aria-label="Search"
        placeholder="Search for characters..."
        value={value}
        onChange={handleUserInput}
        spellCheck="false"
      />
      <div
        className="flex w-10 cursor-pointer justify-center text-primary-foreground dark:text-zinc-300"
        onClick={resetInputField}
      >
        {value !== "" && <Icons.close className="h-4 w-4" />}
      </div>
    </div>
  );
};

export default Search;
