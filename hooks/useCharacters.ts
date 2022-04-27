import { useMemo, useState } from "react";

const useCharacters = (allCharacters: CharacterFilterInfo[]) => {
  const [filter, setFilter] = useState("");

  const characters = useMemo(() => {
    // console.log("IN MEMO");
    const lcFilter = filter.toLowerCase(); // case insensitive
    return allCharacters.filter(({ name }) =>
      name.toLowerCase().includes(lcFilter)
    );
  }, [filter, allCharacters]);

  return { characters, filter, setFilter };
};

export default useCharacters;
