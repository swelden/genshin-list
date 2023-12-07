"use client";

import type { CharacterFilter } from "@/data/types";
import { useCharacters } from "@/hooks/use-characters";
import { CharacterList } from "@/components/character-list";
import { FilterHub } from "@/components/filters/filter-hub";

interface MainCharacterFilterListProps {
  allCharacters: CharacterFilter[];
}

export function MainCharacterFilterList({
  allCharacters,
}: MainCharacterFilterListProps) {
  const {
    characters,
    filter,
    setFilter,
    setSortKey,
    setIsReversed,
    attrFilter,
    setAttrFilter,
  } = useCharacters(allCharacters);

  return (
    <>
      <FilterHub
        setFilter={setFilter}
        setSortKey={setSortKey}
        setIsReversed={setIsReversed}
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <CharacterList characters={characters} />
    </>
  );
}
