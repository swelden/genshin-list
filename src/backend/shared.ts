import * as genshindb from "genshin-db";

export const getCharacterNames = () => {
  const charactersNotIncluded = new Set(["Aether", "Lumine"]);
  return genshindb
    .characters("names", { matchCategories: true })
    .filter((character) => !charactersNotIncluded.has(character));
};
