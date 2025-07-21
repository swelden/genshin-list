"use client";

import * as React from "react";
import { SearchIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSearchQuery } from "@/hooks/use-characters";
import { Input } from "@/components/ui/input";

interface SearchProps {}

export function Search({}: SearchProps) {
  const [searchQuery, setSearchQuery] = useSearchQuery();

  const hasValue = searchQuery !== "";

  // Input Field handler
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Reset Input Field handler
  const resetInputField = () => {
    setSearchQuery("");
  };

  return (
    <div className="ring-primary-ring/80 rounded-full shadow-sm ring-0 transition focus-within:shadow focus-within:ring-1">
      <div className="text-foreground ring-border focus-within:ring-primary-ring flex h-11 items-center rounded-full ring-2 transition ring-inset">
        <SearchIcon className="ml-3 size-5" />
        <Input
          className={cn(
            "h-8 flex-1 rounded-r-full bg-transparent px-2 py-0 text-lg",
            hasValue && "pr-0",
          )}
          type="text"
          aria-label="Search"
          placeholder="Search for Characters..."
          value={searchQuery}
          onChange={handleUserInput}
          spellCheck="false"
        />
        {hasValue && (
          <button className="px-3 py-2" onClick={resetInputField}>
            <X className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
