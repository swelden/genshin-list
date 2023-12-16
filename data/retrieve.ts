import {
  getCharacterFilterInfo,
  getCharacterInfo,
  getCharacterNames,
  getConstellationInfo,
  getTalentInfo,
} from "@/backend/requests";

export function getNamePageProps(name: string) {
  const characterProps = getCharacterInfo(name);
  const talentProps = getTalentInfo(name);
  const constellationProps = getConstellationInfo(name);

  return {
    character: characterProps,
    talents: talentProps,
    constellations: constellationProps,
  };
}

export function getAllCharacters() {
  const characters = getCharacterNames();

  const characterProps = characters.map((name) => {
    return getCharacterFilterInfo(name);
  });

  return characterProps
    .sort((a, b) => b.name.localeCompare(a.name))
    .sort((a, b) => b.rarity.localeCompare(a.rarity));
}
