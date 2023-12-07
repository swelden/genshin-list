"use client";

import * as React from "react";

import type {
  Attributes,
  CharacterFilter,
  CharacterRarity,
  CharacterSortKeys,
  Element,
  Region,
  Weapon,
} from "@/data/types";

export function useCharacters(allCharacters: CharacterFilter[]) {
  const [filter, setFilter] = React.useState("");
  const [sortKey, setSortKey] = React.useState<CharacterSortKeys>("version");
  const [isReversed, setIsReversed] = React.useState(true);
  const [attrFilter, setAttrFilter] = React.useState<Attributes>({
    element: new Set<Element>(),
    weapontype: new Set<Weapon>(),
    region: new Set<Region>(),
    rarity: new Set<CharacterRarity>(),
  });

  // NOTE: might make separate memo for storing sorted array
  const characters = React.useMemo(() => {
    const lcFilter = filter.toLowerCase(); // case insensitive
    return allCharacters
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
  }, [filter, sortKey, isReversed, attrFilter, allCharacters]);

  return {
    characters,
    filter,
    setFilter,
    sortKey,
    setSortKey,
    isReversed,
    setIsReversed,
    attrFilter,
    setAttrFilter,
  };
}
