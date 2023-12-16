import * as z from "zod";

import { formatMarkdown } from "@/backend/markdown";
import { getCharacterWeekdays } from "@/backend/requests";
import type {
  CharacterDB,
  CombatAttribute,
  ConstellationDB,
  MaterialDB,
  StatFunction,
  TalentDB,
} from "@/backend/schema";
import { LEVELS } from "@/data/constants";
import type { ActiveCategory, Character } from "@/data/types";
import { formatAmbrUrl, myRound, pick } from "@/lib/utils";

/**
 * Reformats genshin-db character info to expected format.
 */
export function formatCharacter(character: CharacterDB) {
  return {
    id: character.id,
    name: character.name,
    version: character.version,
    title: character.title,
    description: character.description,
    rarity: character.rarity,
    element: character.elementText,
    weapontype: character.weaponText,
    substat: character.substatText,
    region: character.region,
    affiliation: character.affiliation,
    birthday: character.birthdaymmdd,
    constellation: character.constellation,
    weekdays: getCharacterWeekdays(character.name),
    va: character.cv,
    stats: formatCharStats(character.stats, character.substatText),
    gachaSplash: character.images.filename_gachaSplash,
    icon: character.images.filename_icon,
  };
}

export function formatCharacterFilter(character: Character) {
  return pick(
    character,
    "id",
    "name",
    "version",
    "element",
    "weapontype",
    "region",
    "rarity",
    "icon",
  );
}

function formatActive(
  category: ActiveCategory,
  active: TalentDB["combat1"],
  icon: string,
) {
  return {
    category: category,
    name: active.name,
    description: formatMarkdown(active.descriptionRaw), // descriptionRaw includes flavorText
    // flavorText: active.flavorText ?? "",
    attributes: formatCombatAttributes(active.attributes, category),
    icon: icon,
  };
}

export function formatActives(talents: TalentDB) {
  const actives = [
    formatActive(
      "Normal Attack",
      talents.combat1,
      talents.images.filename_combat1,
    ),
    formatActive(
      "Elemental Skill",
      talents.combat2,
      talents.images.filename_combat2,
    ),
    formatActive(
      "Elemental Burst",
      talents.combat3,
      talents.images.filename_combat3,
    ),
  ];

  // So far only Mona and Ayaka have an alternate sprint
  if (talents.combatsp !== undefined) {
    // zod ensures image file will be there if associated combat exists
    actives.push(
      formatActive(
        "Alternate Sprint",
        talents.combatsp,
        talents.images.filename_combatsp!,
      ),
    );
  }

  return actives;
}

function formatPassive(passive: TalentDB["passive1"], icon: string) {
  return {
    name: passive.name,
    description: formatMarkdown(passive.descriptionRaw),
    icon: icon,
  };
}

export function formatPassives(talents: TalentDB) {
  const passives = [
    formatPassive(talents.passive1, talents.images.filename_passive1),
    formatPassive(talents.passive2, talents.images.filename_passive2),
    formatPassive(talents.passive3, talents.images.filename_passive3),
  ];

  // So far only Kokomi has a fourth passive
  if (talents.passive4 !== undefined) {
    passives.push(
      // zod ensures image file will be there if associated passive exists
      formatPassive(talents.passive4, talents.images.filename_passive4!),
    );
  }

  return passives;
}

function formatConstellation(
  constellation: ConstellationDB["c1"],
  icon: string,
) {
  return {
    name: constellation.name,
    description: formatMarkdown(constellation.descriptionRaw),
    icon: formatAmbrUrl(icon),
  };
}

export function formatConstellations(constellations: ConstellationDB) {
  return [
    formatConstellation(constellations.c1, constellations.images.filename_c1),
    formatConstellation(constellations.c2, constellations.images.filename_c2),
    formatConstellation(constellations.c3, constellations.images.filename_c3),
    formatConstellation(constellations.c4, constellations.images.filename_c4),
    formatConstellation(constellations.c5, constellations.images.filename_c5),
    formatConstellation(constellations.c6, constellations.images.filename_c6),
  ];
}

// Get array of stats at all ascension levels and include lvl 1 and 90
function formatCharStats(statsFunc: StatFunction, substat: string) {
  // ascension levels at 20, 40, 50, 60, 70, 80
  const headings = LEVELS.map(
    ([level, isAscended]) => `Lv.${level}${isAscended === "+" ? "+" : ""}`,
  );

  const statResults = LEVELS.map(([level, isAscended]) =>
    statsFunc(level, isAscended),
  );

  const labelsKeyMap = [
    { label: "Base HP", key: "hp" },
    { label: "Base ATK", key: "attack" },
    { label: "Base DEF", key: "defense" },
    { label: substat, key: "specialized" },
  ] as const;

  return {
    headings: headings,
    data: labelsKeyMap.map(({ label, key }) => {
      return {
        label: label,
        params: statResults.map((result) => result[key]),
      };
    }),
  };
}

function formatCombatAttributes(
  attributes: CombatAttribute,
  category: ActiveCategory,
) {
  const maxLvlMap = {
    "Normal Attack": 10, // max is 15
    "Elemental Skill": 13, // max is 15
    "Elemental Burst": 13, // max is 15
    "Alternate Sprint": 1,
  } as const;

  return attributes.labels.map((label) => {
    // ex: 1-Hit DMG|{param1:F1P}
    const [possibleHeading, possibleParams] = label.split("|");
    const heading = z.string().parse(possibleHeading);
    const params = z.string().parse(possibleParams);

    const maxLvl = Math.min(
      attributes.parameters.param1?.length ?? Infinity,
      maxLvlMap[category],
    );

    return {
      label: heading,
      params: Array.from(Array(maxLvl).keys()).map((i) =>
        formatTalentParams(params, attributes.parameters, i),
      ),
    };
  });
}

function formatTalentParams(
  param: string,
  parameters: CombatAttribute["parameters"],
  talentlevel: number,
) {
  // replaces {paramNum:format} with formatted number
  return param.replace(
    /{(?<paramNum>[^}]+):(?<format>[^}]+)}/g,
    (_match, ...args) => {
      const { paramNum, format } = args.at(-1) as {
        paramNum: string; // `param${number}`
        format: string; // "I" | "F1" | "F2" | "F1P" | "F2P" | "P"
      };

      if (paramNum in parameters) {
        const paramValues = parameters[paramNum]!; // zod ensures there is an associated number[]
        const value = z.number().parse(paramValues[talentlevel]);

        // FormatSchema ensures 1st index is a number if it includes an F
        const precision = format.startsWith("F") ? parseInt(format[1]!) : 0;

        if (format === "I") {
          // integer
          return Math.round(value).toString();
        } else if (format.endsWith("P")) {
          // percent
          return `${myRound(value * 100, precision)}%`;
        } else if (format.startsWith("F")) {
          // float
          return myRound(value, precision).toString();
        } else {
          return value.toString();
        }
      } else {
        throw new Error(`genshindb includes invalid paramNum: ${paramNum}`);
      }
    },
  );
}

export function formatMaterial(material: MaterialDB) {
  return {
    id: material.id,
    name: material.name,
    icon: material.images.filename_icon,
    sortorder: material.sortRank,
    rarity: material.rarity?.toString() ?? "1",
    ...(material.daysOfWeek !== undefined && {
      daysofweek: material.daysOfWeek,
    }),
  };
}
