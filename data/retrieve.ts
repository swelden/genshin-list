import {
  getCharacterFilterInfo,
  getCharacterInfo,
  getCharacterNames,
  getConstellationInfo,
  getTalentInfo,
} from "@/backend/requests";
import { sortString, sortStringAsNumber } from "@/lib/utils";

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
    .sort((a, b) => sortString(a.name, b.name))
    .sort((a, b) => sortString(b.element, a.element))
    .sort((a, b) => sortStringAsNumber(b.version, a.version))
    .sort((a, b) => sortStringAsNumber(b.rarity, a.rarity));
}
