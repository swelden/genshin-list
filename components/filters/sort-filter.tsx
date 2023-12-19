"use client";

import * as React from "react";

import type { CharacterSortKeys } from "@/data/types";
import { useSortKey } from "@/hooks/use-characters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type DropdownOption,
} from "@/components/ui/dropdown-menu";

const options: DropdownOption<CharacterSortKeys>[] = [
  { label: "Version", value: "version" },
  { label: "Element", value: "element" },
  { label: "Weapon", value: "weapon" },
  { label: "Region", value: "region" },
  { label: "Rarity", value: "rarity" }, // NOTE: might label Quality
  { label: "Name", value: "name" },
];

interface SortDropdownProps {
  className?: string;
}

export function SortDropdown({ className }: SortDropdownProps) {
  const [sortKey, setSortKey] = useSortKey();
  const [selectedOption, setSelectedOption] = React.useState(
    () => options.find((option) => option.value === sortKey)!,
  );

  const handleChange = (event: DropdownOption<CharacterSortKeys>) => {
    setSelectedOption(event);
    setSortKey(event.value);
  };

  return (
    <DropdownMenu
      value={selectedOption}
      onChange={handleChange}
      className={className}
    >
      <DropdownMenuTrigger>Sort by {selectedOption.label}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option.value} value={option}>
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
