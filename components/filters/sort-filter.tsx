"use client";

import * as React from "react";

import type { CharacterSortKeys } from "@/data/types";
import { useSortOption } from "@/hooks/use-characters";
import {
  DelayedSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const sortOptions = {
  version: "Version",
  element: "Element",
  weapon: "Weapon",
  region: "Region",
  rarity: "Rarity", // NOTE: might label Quality
  name: "Name",
} as const satisfies Record<CharacterSortKeys, string>;

interface SortDropdownProps {
  className?: string;
}

export function SortDropdown({ className }: SortDropdownProps) {
  const [sortOption, setSortOption] = useSortOption();

  return (
    <DelayedSelect
      value={sortOption}
      onValueChange={(value: string) =>
        setSortOption(value as CharacterSortKeys)
      }
    >
      <SelectTrigger truncate className={className}>
        Sort by {sortOptions[sortOption]}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(sortOptions).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </DelayedSelect>
  );
}
