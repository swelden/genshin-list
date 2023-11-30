"use client";

import { useCharacters } from "@/hooks/use-characters";
import { CharacterList } from "@/components/character-list";
import { FilterHub } from "@/components/filters/filter-hub";

export const MainCharacterFilterList = ({
  allCharacters,
  regions,
}: {
  allCharacters: CharacterFilterInfo[];
  regions: Nation[];
}) => {
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
        regions={regions}
      />
      <CharacterList characters={characters} />
    </>
  );
};
