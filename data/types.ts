import type {
  formatActives,
  formatCharacter,
  formatCharacterFilter,
  formatConstellations,
  formatMaterial,
  formatPassives,
} from "@/backend/format";
import type { getCharacterMaterialInfo } from "@/backend/requests";
import type { Item } from "@/backend/schema";
import {
  CHARACTER_RARITIES,
  ELEMENTS,
  FARMABLE_WEEKDAYS,
  getInitialFilterAttributes,
  ITEM_RARITIES,
  REGIONS,
  WEAPONS,
  WEEKDAYS,
} from "@/data/constants";
import type { OmitStrict, PickValues } from "@/lib/utils";

export type Element = (typeof ELEMENTS)[number];
export type Weapon = (typeof WEAPONS)[number];
export type Region = (typeof REGIONS)[number];
export type CharacterRarity = (typeof CHARACTER_RARITIES)[number];
export type ItemRarity = (typeof ITEM_RARITIES)[number];
export type Weekday = (typeof WEEKDAYS)[number];
export type FarmableWeekday = (typeof FARMABLE_WEEKDAYS)[number];

export type Character = ReturnType<typeof formatCharacter>;

export type CharacterFilter = ReturnType<typeof formatCharacterFilter>;
export type CharacterSortKeys = keyof OmitStrict<
  CharacterFilter,
  "id" | "icon" | "weekday"
>;

export type Active = ReturnType<typeof formatActives>[number];
export type ActiveCategory =
  | "Normal Attack"
  | "Elemental Skill"
  | "Elemental Burst"
  | "Alternate Sprint";
export type Passive = ReturnType<typeof formatPassives>[number];
export type Constellation = ReturnType<typeof formatConstellations>[number];

export type Material = ReturnType<typeof formatMaterial>;
export type MaterialInfo = Record<string, Material>; // Material name to Material info
export type MaterialCount = Record<string, Item[]>; // Material name to Item
export type AllMaterialInfo = ReturnType<typeof getCharacterMaterialInfo>;

export type FilterKeys = keyof OmitStrict<
  CharacterFilter,
  "id" | "icon" | "version" | "name"
>;
export type FilterAttribute = PickValues<CharacterFilter, FilterKeys>;
export type FilterAttributes = ReturnType<typeof getInitialFilterAttributes>;
