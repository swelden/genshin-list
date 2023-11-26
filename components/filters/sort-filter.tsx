"use client";

import { SelectOption } from "@/components/select-menu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

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

export const SortDropdown: SortDropdownProps = ({
  setSortKey,
  className = "",
}) => {
  return <DropdownMenu options={options} setValue={setSortKey} className="" />;
};
