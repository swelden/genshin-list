"use client";

import { SelectOption } from "@/components/select-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import * as React from "react";

const options: SelectOption<CharacterSortKeys>[] = [
  { label: "Version", value: "version" },
  { label: "Element", value: "element" },
  { label: "Weapon", value: "weapontype" },
  { label: "Region", value: "region" },
  { label: "Rarity", value: "rarity" }, // NOTE: might label Quality
  { label: "Name", value: "name" },
];

type SortDropdownProps = React.FC<{
  setSortKey: React.Dispatch<React.SetStateAction<CharacterSortKeys>>;
  className?: string;
}>;

export const SortDropdown: SortDropdownProps = ({ setSortKey, className }) => {
  const [selectedOption, setSelectedOption] = React.useState(options[0]);

  const handleChange = (event: SelectOption<CharacterSortKeys>) => {
    setSelectedOption(event);
    setSortKey(event.value);
  };

  return (
    <DropdownMenu
      value={selectedOption}
      onChange={handleChange}
      className={className}
    >
      <DropdownMenuTrigger className="ui-open:ring-3 ui-open:shadow-inner">
        Sort by {selectedOption.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option.value} value={option}>
            <div
              className={cn(
                "relative flex h-full w-full items-center justify-between rounded-full p-0.5 px-3 transition-colors duration-75",
                "ui-active:bg-secondary-hover ui-active:active:bg-primary ui-active:active:text-primary-foreground",
              )}
            >
              {option.label}
              <Check
                className="ui-selected:flex hidden h-6 w-6"
                strokeWidth={4}
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
