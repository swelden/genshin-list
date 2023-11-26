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
      <DropdownMenuTrigger>Sort by {selectedOption.label}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem key={option.value} value={option}>
            {({ active, selected }) => (
              <div
                className={cn(
                  "relative flex h-full w-full items-center rounded-full p-0.5 px-3 font-medium transition-colors duration-[50ms]",
                  active &&
                    "bg-select-hover active:bg-select-active active:text-select-active-foreground",
                )}
              >
                <span className="block">{option.label}</span>
                {selected && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Check className="h-6 w-6" strokeWidth={4} />
                  </span>
                )}
              </div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
