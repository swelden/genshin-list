"use client";

import CharacterList from "@/components/CharacterList";
import Filters from "@/components/Filters/Filters";
import useCharacters from "@/hooks/useCharacters";

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
      <Filters
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
