import type { CharacterRarity, Element, Region, Weapon } from "@/data/types";

export const ELEMENTS = [
  "Pyro",
  "Hydro",
  "Dendro",
  "Electro",
  "Anemo",
  "Cryo",
  "Geo",
] as const;

export const WEAPONS = [
  "Bow",
  "Catalyst",
  "Claymore",
  "Polearm",
  "Sword",
] as const;

export const REGIONS = [
  "Mondstadt",
  "Liyue",
  "Inazuma",
  "Sumeru",
  "Fontaine",
  "Natlan",
  "Snezhnaya",
  "Khaenri'ah",
  "Other",
] as const;

export const CHARACTER_RARITIES = ["4", "5"] as const;
export const ITEM_RARITIES = ["1", "2", "3", "4", "5"] as const;

export const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export function getInitialFilterAttributes() {
  return {
    element: new Set<Element>(),
    weapon: new Set<Weapon>(),
    region: new Set<Region>(),
    rarity: new Set<CharacterRarity>(),
    // TODO: add weekdays you can get talents
  } as const;
}

export const LEVELS = [
  [1, "-"],
  [20, "-"],
  [20, "+"], // ascend1
  [40, "-"],
  [40, "+"], // ascend2
  [50, "-"],
  [50, "+"], // ascend3
  [60, "-"],
  [60, "+"], // ascend4
  [70, "-"],
  [70, "+"], // ascend5
  [80, "-"],
  [80, "+"], // ascend6
  [90, "-"],
] as const;

export const LVL_TO_ASCENSION = {
  20: "ascend1",
  40: "ascend2",
  50: "ascend3",
  60: "ascend4",
  70: "ascend5",
  80: "ascend6",
} as const;

// https://genshin-impact.fandom.com/wiki/Character_EXP
// "Wanderer's Advice": green, "Adventurer's Experience": blue, "Hero's Wit": purple,
export const LEVEL_EXP_BOOKS_MORA = {
  1: {
    "Wanderer's Advice": 0,
    "Adventurer's Experience": 0,
    "Hero's Wit": 0,
    Mora: 0,
  },
  20: {
    "Wanderer's Advice": 1,
    "Adventurer's Experience": 0,
    "Hero's Wit": 6,
    Mora: 24200,
  },
  40: {
    "Wanderer's Advice": 4,
    "Adventurer's Experience": 3,
    "Hero's Wit": 28,
    Mora: 115800,
  },
  50: {
    "Wanderer's Advice": 0,
    "Adventurer's Experience": 0,
    "Hero's Wit": 29,
    Mora: 116000,
  },
  60: {
    "Wanderer's Advice": 0,
    "Adventurer's Experience": 3,
    "Hero's Wit": 42,
    Mora: 171000,
  },
  70: {
    "Wanderer's Advice": 1,
    "Adventurer's Experience": 3,
    "Hero's Wit": 59,
    Mora: 239200,
  },
  80: {
    "Wanderer's Advice": 2,
    "Adventurer's Experience": 2,
    "Hero's Wit": 80,
    Mora: 322400,
  },
  90: {
    "Wanderer's Advice": 4,
    "Adventurer's Experience": 0,
    "Hero's Wit": 171,
    Mora: 684800,
  },
} as const satisfies Record<number, LevelMaterials>;

interface LevelMaterials {
  "Wanderer's Advice": number;
  "Adventurer's Experience": number;
  "Hero's Wit": number;
  Mora: number;
}
