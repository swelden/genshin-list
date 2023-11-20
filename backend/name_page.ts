import * as genshindb from "genshin-db";
import { formatAttributes, formatMarkdown } from "../utils/markdown";
import { myRound } from "../utils/math";

interface ActiveTalent
  extends Omit<genshindb.CombatTalentDetail, "attributes"> {
  category: string;
  attributes: { label: string; params: string[] }[];
  icon: string;
}

interface PassiveTalent extends genshindb.PassiveTalentDetail {
  icon: string;
}

export interface TalentInfo {
  actives: ActiveTalent[];
  passives: PassiveTalent[];
}

export interface MaterialDataMap {
  [key: string | number]: {
    nameicon: string;
    sortorder: number;
    rarity: string;
    daysofweek?: string[];
  };
}

export interface MaterialInfo {
  characterCosts: {
    [key: string]: genshindb.Items[];
  };
  talentCosts: {
    [key: string]: genshindb.Items[];
  };
  materialData: MaterialDataMap;
}

export interface CharacterStats {
  data: { label: string; params: string[] }[];
  headings: string[];
}

export interface CharacterInfo
  extends Omit<
    genshindb.Character,
    | "association"
    | "birthday"
    | "costs"
    | "fullname"
    | "images"
    | "rarity"
    | "stats"
    | "url"
    | "version"
  > {
  image: string;
  rarity: number;
  stats: CharacterStats;
}

export interface ConstellationInfo {
  icon: string;
  name: string;
  info: string;
}

export interface NamePageProps {
  character: CharacterInfo;
  talents: TalentInfo;
  materials: MaterialInfo;
  constellations: ConstellationInfo[];
}

const getActives = (talents: genshindb.Talent): ActiveTalent[] => {
  const images = talents.images!;

  // possible for any talent to be missing description, but mostly combat1
  return [
    {
      category: "Normal Attack",
      name: talents.combat1.name,
      info: formatMarkdown(talents.combat1.info),
      description: talents.combat1.description ?? "",
      attributes: formatAttributes(talents.combat1.attributes, "Normal Attack"),
      icon: images.combat1,
    },
    {
      category: "Elemental Skill",
      name: talents.combat2.name,
      info: formatMarkdown(talents.combat2.info),
      description: talents.combat2.description ?? "",
      attributes: formatAttributes(
        talents.combat2.attributes,
        "Elemental Skill",
      ),
      icon: images.combat2,
    },
    {
      category: "Elemental Burst",
      name: talents.combat3.name,
      info: formatMarkdown(talents.combat3.info),
      description: talents.combat3.description ?? "",
      attributes: formatAttributes(
        talents.combat3.attributes,
        "Elemental Burst",
      ),
      icon: images.combat3,
    },
    // So far only Mona and Ayaka have an alternate sprint
    ...(talents.combatsp !== undefined
      ? [
          {
            category: "Alternate Sprint",
            name: talents.combatsp.name,
            info: formatMarkdown(talents.combatsp.info),
            description: talents.combatsp.description ?? "",
            attributes: formatAttributes(
              talents.combatsp.attributes,
              "Alternate Sprint",
            ),
            icon: images.combatsp!,
          },
        ]
      : []),
  ];
};

const getPassives = (talents: genshindb.Talent): PassiveTalent[] => {
  let passiveNum = 1; // 4 is the current max passives | held by Kokomi
  let passiveStr = `passive${passiveNum}`;
  const images = talents.images!;
  const passives: PassiveTalent[] = [];

  while (talents.hasOwnProperty(passiveStr)) {
    const passiveTalent = talents[
      passiveStr as keyof genshindb.Talent
    ] as genshindb.PassiveTalentDetail;
    passives.push({
      name: passiveTalent.name,
      info: formatMarkdown(passiveTalent.info),
      icon: images[passiveStr as keyof typeof images]!,
    });
    passiveNum++;
    passiveStr = `passive${passiveNum}`;
  }
  return passives;
};

const getMaterialData = (costItem: {
  [key: string]: genshindb.Items[];
}): MaterialDataMap => {
  const names: string[] = [];
  for (const items of Object.values(costItem)) {
    for (const { name } of items) {
      names.push(name);
    }
  }

  return getMaterialDataFromNames(names);
};

const getMaterialDataFromNames = (names: string[]): MaterialDataMap => {
  const materialDataMap: MaterialDataMap = {};
  for (const name of names) {
    const {
      images: { nameicon },
      sortorder,
      daysofweek,
      rarity,
    } = genshindb.materials(name)!;

    materialDataMap[name] = {
      nameicon,
      sortorder,
      rarity: rarity ?? "1",
      ...(daysofweek !== undefined && { daysofweek }),
    };
  }

  return materialDataMap;
};

// Get array of stats at all ascension levels and include lvl 1 and 90
const getCharStats = (
  stats: genshindb.StatFunction,
  substat: string,
  levels: [number, "-" | "+"][],
): CharacterStats => {
  // ascension levels at 20, 40, 50, 60, 70, 80

  const headings = levels.map(
    ([level, isAscended]) => `Lv.${level}${isAscended === "+" ? "+" : ""}`,
  );

  const statResults = levels.map((level) => stats(...level));

  const labelsKeyMap: {
    label: string;
    key: keyof genshindb.StatResult;
    isPossiblePercent: boolean;
  }[] = [
    { label: "Base HP", key: "hp", isPossiblePercent: false },
    { label: "Base ATK", key: "attack", isPossiblePercent: false },
    { label: "Base DEF", key: "defense", isPossiblePercent: false },
    { label: substat, key: "specialized", isPossiblePercent: true },
  ];

  return {
    headings,
    data: labelsKeyMap.map(({ label, isPossiblePercent, key }) => {
      return {
        label,
        params: statResults.map((result) =>
          isPossiblePercent && Number.isInteger(result[key]) === false
            ? `${myRound((result[key] ?? 0) * 100, 1)}%`
            : `${Math.round(result[key] ?? 0)}`,
        ),
      };
    }),
  };
};

interface LevelupCosts {
  [key: number]: genshindb.Items[];
}
const getLevelUpMaterials = (): [LevelupCosts, MaterialDataMap] => {
  const xpBookNames = genshindb.materials("EXP_FRUIT", {
    matchCategories: true,
  }) as string[];

  const xpBookMap = getMaterialDataFromNames(xpBookNames);
  const rarityToName = Object.fromEntries(
    Object.entries(xpBookMap).map(([name, info]) => [info.rarity, name]),
  );

  // https://genshin-impact.fandom.com/wiki/Character_EXP
  // "4": purple, "3": blue, "2": green
  const levelMats = {
    1: {},
    20: { "4": 6, "2": 1, Mora: 24200 },
    40: { "4": 28, "3": 3, "2": 4, Mora: 115800 },
    50: { "4": 29, Mora: 116000 },
    60: { "4": 42, "3": 3, Mora: 171000 },
    70: { "4": 59, "3": 3, "2": 1, Mora: 239200 },
    80: { "4": 80, "3": 2, "2": 2, Mora: 322400 },
    90: { "4": 171, "2": 4, Mora: 684800 },
  };

  const levelCosts: LevelupCosts = Object.fromEntries(
    Object.entries(levelMats).map(([lvl, info]) => [
      lvl,
      Object.entries(info).map(([name, amt]) => {
        return { name: rarityToName[name] ?? name, count: amt };
      }),
    ]),
  );

  return [levelCosts, xpBookMap];
};

const getMaterialProps = (
  characterInfo: genshindb.Character,
  characterTalents: genshindb.Talent,
  levels: [number, "-" | "+"][],
): MaterialInfo => {
  const lvltoAscensionMap: {
    [key: number]: keyof genshindb.Character["costs"];
  } = {
    20: "ascend1",
    40: "ascend2",
    50: "ascend3",
    60: "ascend4",
    70: "ascend5",
    80: "ascend6",
  };

  const [levelCosts, xpBookMap] = getLevelUpMaterials();

  const characterCosts: { [key: string]: genshindb.Items[] } =
    Object.fromEntries(
      levels.map(([lvl, isAscended]) => {
        if (isAscended === "+") {
          return [`${lvl}+`, characterInfo.costs[lvltoAscensionMap[lvl]]];
        } else {
          return [`${lvl}`, levelCosts[lvl]];
        }
      }),
    );

  const talentCosts: { [key: string]: genshindb.Items[] } = Object.fromEntries(
    Object.entries(characterTalents.costs).map(([key, items]) => {
      return [key.replace("lvl", ""), items];
    }),
  );

  // lvl 1 talents aren't included in characterTalents.costs so include it here
  talentCosts["1"] = [];

  return {
    characterCosts: characterCosts,
    talentCosts: talentCosts,
    materialData: {
      ...getMaterialData(characterInfo.costs),
      ...getMaterialData(characterTalents.costs),
      ...xpBookMap,
    },
  };
};

const formatAmbrUrl = (url: string) => {
  const ambrUrl = "https://api.ambr.top/assets/UI/";
  const path = url.substring(url.lastIndexOf("/") + 1);
  return `${ambrUrl}${path}`;
};

export const getNamePageProps = (name: string): NamePageProps => {
  const characterInfo = genshindb.characters(name)!;
  const characterTalents = genshindb.talents(name)!;
  const characterConstellations = genshindb.constellations(name)!;
  const levels: [number, "-" | "+"][] = [
    [1, "-"],
    [20, "-"],
    [20, "+"],
    [40, "-"],
    [40, "+"],
    [50, "-"],
    [50, "+"],
    [60, "-"],
    [60, "+"],
    [70, "-"],
    [70, "+"],
    [80, "-"],
    [80, "+"],
    [90, "-"],
  ];

  const characterProps: CharacterInfo = {
    name: characterInfo.name,
    title: characterInfo.title,
    description: characterInfo.description,
    rarity: parseInt(characterInfo.rarity, 10),
    element: characterInfo.element,
    weapontype: characterInfo.weapontype,
    substat: characterInfo.substat,
    gender: characterInfo.gender,
    body: characterInfo.body,
    region: characterInfo.region,
    affiliation: characterInfo.affiliation,
    birthdaymmdd: characterInfo.birthdaymmdd,
    constellation: characterInfo.constellation,
    cv: characterInfo.cv, // NOTE: might only get english cv
    stats: getCharStats(characterInfo.stats, characterInfo.substat, levels),
    image: characterInfo.images.namegachasplash!,
  };

  const talentProps: TalentInfo = {
    actives: getActives(characterTalents),
    passives: getPassives(characterTalents),
  };

  const materialProps = getMaterialProps(
    characterInfo,
    characterTalents,
    levels,
  );

  const constellationProps: ConstellationInfo[] = [
    {
      name: characterConstellations.c1.name,
      info: formatMarkdown(characterConstellations.c1.effect),
      icon: formatAmbrUrl(characterConstellations.images.c1),
    },
    {
      name: characterConstellations.c2.name,
      info: formatMarkdown(characterConstellations.c2.effect),
      icon: formatAmbrUrl(characterConstellations.images.c2),
    },
    {
      name: characterConstellations.c3.name,
      info: formatMarkdown(characterConstellations.c3.effect),
      icon: formatAmbrUrl(characterConstellations.images.c3),
    },
    {
      name: characterConstellations.c4.name,
      info: formatMarkdown(characterConstellations.c4.effect),
      icon: formatAmbrUrl(characterConstellations.images.c4),
    },
    {
      name: characterConstellations.c5.name,
      info: formatMarkdown(characterConstellations.c5.effect),
      icon: formatAmbrUrl(characterConstellations.images.c5),
    },
    {
      name: characterConstellations.c6.name,
      info: formatMarkdown(characterConstellations.c6.effect),
      icon: formatAmbrUrl(characterConstellations.images.c6),
    },
  ];

  return {
    character: characterProps,
    talents: talentProps,
    materials: materialProps,
    constellations: constellationProps,
  };
};
