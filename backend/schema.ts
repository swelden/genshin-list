import * as z from "zod";

import {
  CHARACTER_RARITIES,
  ELEMENTS,
  ITEM_RARITIES,
  REGIONS,
  WEAPONS,
  WEEKDAYS,
} from "@/data/constants";
import { myRound } from "@/lib/utils";

const ImageSchema = z.string().trim().min(1);

const ItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  count: z.number(),
});

export type Item = z.infer<typeof ItemSchema>;

const StatResultSchema = z.object({
  level: z.number(),
  ascension: z.number(),
  hp: z.number().transform((val) => Math.round(val).toString()),
  attack: z.number().transform((val) => Math.round(val).toString()),
  defense: z.number().transform((val) => Math.round(val).toString()),
  specialized: z
    .number()
    .transform((val) =>
      Number.isInteger(val)
        ? Math.round(val).toString()
        : `${myRound(val * 100, 1)}%`,
    ), // isPossiblePercent
});

// Using a workaround to keep function type for a Zod schema (see https://github.com/colinhacks/zod/issues/4143#issuecomment-2845134912)
const statFunctionSchema = <T extends z.core.$ZodFunction>(schema: T) =>
  z.custom<Parameters<T["implement"]>[0]>((fn) =>
    schema.implement(fn as Parameters<T["implement"]>[0]),
  );

// ƒ (level: number, ascension: number | "+" | "-"): StatResult
export const StatFunctionSchema = statFunctionSchema(
  z.function({
    input: [z.number(), z.union([z.number(), z.literal("+"), z.literal("-")])],
    output: StatResultSchema,
  }),
);

export type StatFunction = z.infer<typeof StatFunctionSchema>;

export const CharacterDBSchema = z.object({
  id: z.number(),
  name: z.string(),
  rarity: z.coerce.string().pipe(z.enum(CHARACTER_RARITIES)), // "4" | "5"
  version: z.string(),

  title: z.string(), // empty string for Traveler
  description: z.string(),
  constellation: z.string(),

  elementText: z.enum(ELEMENTS),
  weaponText: z.enum(WEAPONS),
  substatText: z.string(), // "CRIT DMG" | "ATK" | ...

  affiliation: z.string(),
  region: z.enum(REGIONS).catch("Other"), // empty string if Traveler or crossover (Aloy)

  // birthday: z.string(), // "month day"
  birthdaymmdd: z.string(), // "mm/dd"

  stats: StatFunctionSchema,
  costs: z.object({
    ascend1: z.array(ItemSchema),
    ascend2: z.array(ItemSchema),
    ascend3: z.array(ItemSchema),
    ascend4: z.array(ItemSchema),
    ascend5: z.array(ItemSchema),
    ascend6: z.array(ItemSchema),
  }),
  cv: z.object({
    english: z.string(),
    // chinese: z.string(),
    // japanese: z.string(),
    // korean: z.string(),
  }),
  images: z.object({
    filename_icon: ImageSchema, // UI_AvatarIcon_Name
    filename_gachaSplash: ImageSchema, // Traveler doesn't have this | include .optional() if including Traveler
  }),
});

export type CharacterDB = z.infer<typeof CharacterDBSchema>;

const ConstellationItemSchema = z.object({
  name: z.string(),
  descriptionRaw: z.string(),
});

export const ConstellationDBSchema = z.object({
  c1: ConstellationItemSchema,
  c2: ConstellationItemSchema,
  c3: ConstellationItemSchema,
  c4: ConstellationItemSchema,
  c5: ConstellationItemSchema,
  c6: ConstellationItemSchema,
  images: z.object({
    filename_c1: ImageSchema,
    filename_c2: ImageSchema,
    filename_c3: ImageSchema,
    filename_c4: ImageSchema,
    filename_c5: ImageSchema,
    filename_c6: ImageSchema,
  }),
});

export type ConstellationDB = z.infer<typeof ConstellationDBSchema>;

const CombatAttributeSchema = z.object({
  labels: z.string().array(),
  parameters: z.record(z.string(), z.number().array()),
});

export type CombatAttribute = z.infer<typeof CombatAttributeSchema>;

const CombatTalentSchema = z.object({
  name: z.string(),
  descriptionRaw: z.string(),
  flavorText: z.string().optional(), // no flavorText for combat1 (normal attack)
  attributes: CombatAttributeSchema,
});

const PassiveTalentSchema = z.object({
  name: z.string(),
  descriptionRaw: z.string(),
});

export const TalentDBSchema = z
  .object({
    combat1: CombatTalentSchema,
    combat2: CombatTalentSchema,
    combatsp: CombatTalentSchema.optional(), // for Mona/Ayaka
    combat3: CombatTalentSchema,
    passive1: PassiveTalentSchema,
    passive2: PassiveTalentSchema,
    passive3: PassiveTalentSchema, // Traveler doesn't have a third talent | include .optional() if including Traveler
    passive4: PassiveTalentSchema.optional(), // for Kokomi
    costs: z.object({
      lvl1: ItemSchema.array().default([]), // // lvl 1 talents aren't included so default to empty array
      lvl2: ItemSchema.array(),
      lvl3: ItemSchema.array(),
      lvl4: ItemSchema.array(),
      lvl5: ItemSchema.array(),
      lvl6: ItemSchema.array(),
      lvl7: ItemSchema.array(),
      lvl8: ItemSchema.array(),
      lvl9: ItemSchema.array(),
      lvl10: ItemSchema.array(),
    }),
    images: z.object({
      filename_combat1: ImageSchema,
      filename_combat2: ImageSchema,
      filename_combatsp: ImageSchema.optional(), // for Mona/Ayaka
      filename_combat3: ImageSchema,
      filename_passive1: ImageSchema,
      filename_passive2: ImageSchema,
      filename_passive3: ImageSchema, // Traveler doesn't have a third talent | include .optional() if including Traveler
      filename_passive4: ImageSchema.optional(), // for Kokomi's negative crit passive
    }),
  })
  // check and error if talent exists but associated image does not
  .superRefine((val, ctx) => {
    if (val.combatsp && val.images.filename_combatsp === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "combatsp is missing required images.filename_combatsp",
        path: ["images", "filename_combatsp"],
      });
    }

    if (val.passive4 && val.images.filename_passive4 === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "passive4 is missing required images.filename_passive4",
        path: ["images", "filename_passive4"],
      });
    }
  });

export type TalentDB = z.infer<typeof TalentDBSchema>;

export const MaterialDBSchema = z.object({
  id: z.number(),
  name: z.string(),
  dupealias: z.string().optional(), // Key Sigil, Cake for Traveler
  rarity: z.coerce.string().pipe(z.enum(ITEM_RARITIES)).optional(), // not every material has this
  sortRank: z.number(),

  description: z.string(),
  category: z.enum([
    "ADSORBATE",
    "AVATAR_MATERIAL",
    "CONSUME",
    "EXCHANGE",
    "EXP_FRUIT",
    "FISH_BAIT",
    "FISH_ROD",
    "ITEM_VIRTUAL",
    "NOTICE_ADD_HP",
    "WEAPON_EXP_STONE",
    "WOOD",
  ]),
  typeText: z.string(),

  dropDomainId: z.number().optional(),
  dropDomainName: z.string().optional(),
  daysOfWeek: z.enum(WEEKDAYS).array().optional(), // for domain

  sources: z.string().array(),

  images: z.object({ filename_icon: z.string() }),
});

export type MaterialDB = z.infer<typeof MaterialDBSchema>;
