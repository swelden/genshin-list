import { useMemo, useState } from "react";

interface Attributes {
  visions: Set<Visions>;
  weapons: Set<Weapons>;
  nations: Set<Nations>;
  rarity: Set<Rarity>;
}

const useCharacters = (allCharacters: CharacterFilterInfo[]) => {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<CharacterFilterKeys>("name");
  const [isReversed, setIsReversed] = useState(false);
  const [attrFilter, setAttrFilter] = useState<Attributes>({
    visions: new Set(),
    weapons: new Set(),
    nations: new Set(),
    rarity: new Set(),
  });

  // NOTE: might make separate memo for storing sorted/reversed array
  const characters = useMemo(() => {
    const lcFilter = filter.toLowerCase(); // case insensitive
    const filteredCharacters = allCharacters
      .filter(({ name }) => name.toLowerCase().includes(lcFilter))
      .sort((a, b) => a[sortKey].localeCompare(b[sortKey]));

    return isReversed ? filteredCharacters.reverse() : filteredCharacters;
  }, [filter, sortKey, isReversed, allCharacters]);

  return {
    characters,
    filter,
    setFilter,
    sortKey,
    setSortKey,
    isReversed,
    setIsReversed,
  };
};

export default useCharacters;
