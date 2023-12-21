import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import { getInitialFilterAttributes } from "@/data/constants";
import { getAllCharacters } from "@/data/retrieve";
import type {
  CharacterFilter,
  CharacterSortKeys,
  FilterAttributes,
} from "@/data/types";
import type { DropdownOption } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/components/filters/sort-filter";

const searchQueryAtom = atom("");
const sortOptionAtom = atom<DropdownOption<CharacterSortKeys>>(
  sortOptions[0] ?? { label: "Version", value: "version" },
);
const isReversedAtom = atom(true);
const attrFilterAtom = atom<FilterAttributes>(getInitialFilterAttributes());
const charactersAtom = atom<CharacterFilter[]>(getAllCharacters());
const filteredCharactersAtom = atom((get) => {
  const characters = get(charactersAtom);
  const attrFilter = get(attrFilterAtom);
  const isReversed = get(isReversedAtom);
  const sortKey = get(sortOptionAtom).value;
  const lcFilter = get(searchQueryAtom).toLowerCase(); // case insensitive

  return characters
    .filter(
      (character) =>
        character.name.toLowerCase().includes(lcFilter) &&
        Object.entries(attrFilter).every(([key, filterSet]) => {
          if (filterSet.size === 0) {
            return true;
          }

          const characterValue = character[key as keyof CharacterFilter];
          return (filterSet as Set<unknown>).has(characterValue);
        }),
    )
    .sort(
      isReversed
        ? (b, a) => a[sortKey].localeCompare(b[sortKey])
        : (a, b) => a[sortKey].localeCompare(b[sortKey]),
    );
});

export function useSearchQuery() {
  return useAtom(searchQueryAtom);
}

export function useSortOption() {
  return useAtom(sortOptionAtom);
}

export function useIsReversed() {
  return useAtom(isReversedAtom);
}

export function useSetIsReversed() {
  return useSetAtom(isReversedAtom);
}

export function useAttrFilter() {
  return useAtom(attrFilterAtom);
}

export function useCharacters() {
  return useAtom(charactersAtom);
}

export function useFilteredCharacters() {
  return useAtomValue(filteredCharactersAtom);
}
