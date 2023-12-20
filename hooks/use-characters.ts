import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import { getAllCharacters } from "@/data/retrieve";
import type {
  Attributes,
  CharacterFilter,
  CharacterRarity,
  CharacterSortKeys,
  Element,
  Region,
  Weapon,
} from "@/data/types";
import type { DropdownOption } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/components/filters/sort-filter";

const searchQueryAtom = atom("");
const sortOptionAtom = atom<DropdownOption<CharacterSortKeys>>(
  sortOptions[0] ?? { label: "Version", value: "version" },
);
const isReversedAtom = atom(true);
const attrFilterAtom = atom<Attributes>({
  element: new Set<Element>(),
  weapon: new Set<Weapon>(),
  region: new Set<Region>(),
  rarity: new Set<CharacterRarity>(),
  // TODO: add weekdays you can get talents
});
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
        Object.entries(attrFilter).every(([key, value]) =>
          value.size === 0
            ? true
            : value.has(character[key as keyof CharacterFilter]),
        ),
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
