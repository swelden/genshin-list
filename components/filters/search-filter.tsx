import * as React from "react";
import { SearchIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const Search = ({ setFilter }: SearchProps) => {
  const [value, setValue] = React.useState("");

  const hasValue = value !== "";

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
    <div className="ring-primary-ring/80 rounded-full shadow-sm ring-0 transition focus-within:shadow-md focus-within:ring-1">
      <div className="focus-within:ring-primary-ring flex h-11 items-center rounded-full text-foreground ring-2 ring-inset ring-border transition">
        <SearchIcon className="ml-3 h-5 w-5" />
        <Input
          className={cn(
            "h-8 flex-1 rounded-r-full bg-transparent px-2 py-0 text-lg",
            hasValue && "pr-0",
          )}
          type="text"
          aria-label="Search"
          placeholder="Search for Characters..."
          value={value}
          onChange={handleUserInput}
          spellCheck="false"
        />
        {hasValue && (
          <button className="px-3 py-2" onClick={resetInputField}>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};
Search.displayName = "Search";
