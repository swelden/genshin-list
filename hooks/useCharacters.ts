import { useMemo, useState } from "react";

const useCharacters = (allCharacters: CharacterFilterInfo[]) => {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<CharacterFilterKeys>("name");
  const [isReversed, setIsReversed] = useState(false);
  const [attrFilter, setAttrFilter] = useState<Attributes>({
    vision: new Set<Visions>(),
    weapon: new Set<Weapons>(),
    nation: new Set<Nations>(),
    rarity: new Set<Rarity>(),
  });

  // NOTE: might make separate memo for storing sorted/reversed array
  const characters = useMemo(() => {
    const lcFilter = filter.toLowerCase(); // case insensitive
    const filteredCharacters = allCharacters
      .filter(
        (character) =>
          character.name.toLowerCase().includes(lcFilter) &&
          Object.entries(attrFilter).every(([key, value]) =>
            value.size === 0
              ? true
              : value.has(character[key as keyof CharacterFilterInfo])
          )
      )
      .sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

    return isReversed ? filteredCharacters.reverse() : filteredCharacters;
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
};

export default useCharacters;
