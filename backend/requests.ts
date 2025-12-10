import * as z from "zod";

import { api } from "@/backend/api";
import {
  formatActives,
  formatCharacter,
  formatCharacterFilter,
  formatConstellations,
  formatMaterial,
  formatPassives,
} from "@/backend/format";
import {
  CharacterDBSchema,
  ConstellationDBSchema,
  MaterialDBSchema,
  TalentDBSchema,
} from "@/backend/schema";
import {
  LEVEL_EXP_BOOKS_MORA,
  LEVELS,
  LVL_TO_ASCENSION,
} from "@/data/constants";
import type {
  FarmableWeekday,
  MaterialCount,
  MaterialInfo,
} from "@/data/types";

export function getCharacterNames() {
  const names = api(
    {
      folder: "characters",
      query: "names",
      data: { matchCategories: true },
    },
    z.string().array(),
  );

  const charactersNotIncluded = new Set(["Aether", "Lumine", "Manekin", "Manekina"]);
  const filteredCharacterNames = names.filter(
    (character) => !charactersNotIncluded.has(character),
  );

  return filteredCharacterNames;
}

function getCharacterDBInfo(name: string) {
  const characterResponse = api(
    {
      folder: "characters",
      query: name,
    },
    CharacterDBSchema,
  );

  return characterResponse;
}

export function getCharacterInfo(name: string) {
  const characterDBInfo = getCharacterDBInfo(name);
  return formatCharacter(characterDBInfo);
}

// returns a character object containing only keys necessary for filtering and sorting character
export function getCharacterFilterInfo(name: string) {
  const characterInfo = getCharacterInfo(name);
  return formatCharacterFilter(characterInfo);
}

function getTalentDBInfo(name: string) {
  const talentResponse = api(
    { folder: "talents", query: name },
    TalentDBSchema,
  );
  return talentResponse;
}

export function getTalentInfo(name: string) {
  const talentDBInfo = getTalentDBInfo(name);
  return {
    actives: formatActives(talentDBInfo),
    passives: formatPassives(talentDBInfo),
  };
}

export function getConstellationInfo(name: string) {
  const constellationResponse = api(
    {
      folder: "constellations",
      query: name,
    },
    ConstellationDBSchema,
  );

  return formatConstellations(constellationResponse);
}

export function getCharacterWeekdays(name: string) {
  const { talentMaterialData } = getCharacterTalentMaterialInfo(name);

  for (const material of Object.values(talentMaterialData)) {
    if (material.daysofweek) {
      return material.daysofweek;
    }
  }

  throw new Error(`Character "${name}" is missing required daysOfWeek`);
}

export function getCharacterFarmableWeekdays(name: string): FarmableWeekday {
  const { talentMaterialData } = getCharacterTalentMaterialInfo(name);

  for (const material of Object.values(talentMaterialData)) {
    if (material.daysofweek) {
      const daysOfWeek = material.daysofweek;

      if (daysOfWeek.includes("Monday")) {
        return "Mon & Thu"; // Monday & Thursday
      } else if (daysOfWeek.includes("Tuesday")) {
        return "Tue & Fri"; // Tuesday & Friday
      } else {
        return "Wed & Sat"; // Wednesday & Saturday
      }
    }
  }

  throw new Error(`Character "${name}" is missing required daysOfWeek`);
}

export function getCharacterMaterialInfo(name: string) {
  const { characterCosts, characterMaterialData } =
    getCharacterLvlAscensionMaterialInfo(name);
  const { talentCosts, talentMaterialData } =
    getCharacterTalentMaterialInfo(name);

  return {
    costs: { levels: characterCosts, talents: talentCosts },
    nameToInfo: {
      ...characterMaterialData,
      ...talentMaterialData,
    },
  };
}

function getCharacterLvlAscensionMaterialInfo(name: string) {
  const characterDBInfo = getCharacterDBInfo(name);
  const { levelCosts, xpBookMap } = getLevelUpMaterials();

  const characterCosts: MaterialCount = Object.fromEntries(
    LEVELS.map(([lvl, isAscended]) => {
      if (isAscended === "+") {
        const key = `${lvl}+`;
        const value = characterDBInfo.costs[LVL_TO_ASCENSION[lvl]];
        return [key, value];
      } else {
        const key = lvl;
        const value = levelCosts[lvl] ?? [];
        return [key, value];
      }
    }),
  );

  return {
    characterCosts,
    characterMaterialData: {
      ...getMaterialData(characterDBInfo.costs),
      ...xpBookMap,
    },
  };
}

function getCharacterTalentMaterialInfo(name: string) {
  const talentDBInfo = getTalentDBInfo(name);

  // remove lvl from key => lvl2 => 2
  const talentCosts: MaterialCount = Object.fromEntries(
    Object.entries(talentDBInfo.costs).map(([key, items]) => {
      return [key.replace("lvl", ""), items];
    }),
  );

  return {
    talentCosts,
    talentMaterialData: {
      ...getMaterialData(talentDBInfo.costs),
    },
  };
}

function getLevelUpMaterials() {
  const xpBookNames = api(
    {
      folder: "materials",
      query: "EXP_FRUIT",
      data: { matchCategories: true },
    },
    z.string().array(),
  );

  const xpBookMap = getMaterialDataFromNames([...xpBookNames, "Mora"]);

  const levelCosts: MaterialCount = Object.fromEntries(
    Object.entries(LEVEL_EXP_BOOKS_MORA).map(([lvl, info]) => [
      lvl,
      Object.entries(info).map(([name, count]) => {
        const info = z
          .object({ name: z.string(), id: z.number() })
          .parse(xpBookMap[name]);
        return {
          id: info.id,
          name: info.name,
          count: count,
        };
      }),
    ]),
  );

  return { levelCosts, xpBookMap };
}

function getMaterialData(costItem: MaterialCount) {
  const names: string[] = [];
  for (const items of Object.values(costItem)) {
    for (const { name } of items) {
      names.push(name);
    }
  }

  return getMaterialDataFromNames(names);
}

function getMaterialDataFromNames(names: string[]) {
  const materialDataMap: MaterialInfo = {};
  for (const name of names) {
    const material = api(
      { folder: "materials", query: name },
      MaterialDBSchema,
    );

    materialDataMap[name] = formatMaterial(material);
  }

  return materialDataMap;
}
