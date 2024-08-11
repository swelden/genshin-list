"use client";

import * as React from "react";

import { sortOptions, useSortOption } from "@/hooks/use-characters";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select-downshift";

interface SortDropdownProps {
  className?: string;
}

export function SortDropdown({ className }: SortDropdownProps) {
  const [sortOption, setSortOption] = useSortOption();

  return (
    <Select
      items={sortOptions}
      selectedItem={sortOption}
      setSelectedItem={setSortOption}
      className={className}
    >
      <SelectTrigger />
      <SelectContent />
    </Select>
  );
}

// export function SortDropdown({ className }: SortDropdownProps) {
//   const [sortOption, setSortOption] = useSortOption();

//   return (
//     <Select
//       value={sortOption}
//       onChange={(value: string) => setSortOption(value as CharacterSortKeys)}
//     >
//       <SelectTrigger truncate className={className}>
//         Sort by {sortOptions[sortOption]}
//       </SelectTrigger>
//       <SelectContent>
//         {Object.entries(sortOptions).map(([value, label]) => (
//           <SelectItem key={value} value={value}>
//             {label}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// }
