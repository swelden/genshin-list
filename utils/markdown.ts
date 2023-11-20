import { myRound } from "@/utils/math";
import { CombatTalentDetail } from "genshin-db";

const ElementColor = {
  Pyro: "text-pyro",
  Hydro: "text-hydro",
  Wet: "text-hydro", // Mona
  Dendro: "text-dendro",
  Electro: "text-electro",
  Freikugel: "text-electro", // Fischl
  Anemo: "text-anemo",
  Cryo: "text-cryo",
  Geo: "text-geo",
} as const;

const createElementSpanRegExp = (): RegExp => {
  const invalidBehindWords = ["\\d"].join("|");
  const validBehindWords = ["AoE"].join("|");
  const elements: string = new Array<keyof typeof ElementColor>(
    "Pyro",
    "Hydro",
    "Wet", // Mona
    "Dendro",
    "Electro",
    "Freikugel", // Fischl
    "Anemo",
    "Cryo",
    "Geo",
  ).join("|");
  const validAheadWords = [
    "DMG",
    "RES",
    "Bonus",
    "Infusion",
    "Construct",
    "related Elemental Reactions?",
  ].join("|");
  const invalidEndChars = "[a-zA-Z0-9_-]";
  const invalidEndWords = ["Swirl", "Explosion", "Pearl"].join("|"); // NOTE: only checking for uppercase won't work
  // NOTE: ex: Cryo CRIT DMG -> Cryo should still be highlighted but not CRIT DMG

  const invalidBehindRegExp = `(?<!(${invalidBehindWords})(\\s|-))`;
  const validBehindRegExp = `((${validBehindWords})(\\s|-))*`;
  const indicatorRegExp = `(?<indicator>${elements})`;
  const validAheadRegExp = `((\\s|-)(${validAheadWords}))*`;
  const invalidEndRegExp = `(?!(${invalidEndChars})|((\\s|-)(${invalidEndWords}))+)`;

  return new RegExp(
    `${invalidBehindRegExp}(${validBehindRegExp}${indicatorRegExp}${validAheadRegExp})${invalidEndRegExp}`,
    "g",
  );
};

// const elementSpanRegExp = createElementSpanRegExp();
// console.log(elementSpanRegExp);

// NOTE: might sanitize because I don't have control over text
export const formatMarkdown = (text: string): string => {
  return text
    .replace(
      /\*\*([^*]+)\*\*/g, // **text** -> <span>text</span>
      '<span class="text-gold">$1</span>',
    )
    .replace(createElementSpanRegExp(), (match, ...params) => {
      // groups is the last argument
      const indicator: keyof typeof ElementColor = params.at(-1)["indicator"];
      return `<span class="${ElementColor[indicator]}">${match}</span>`;
    })
    .replace(/\n/g, "<br>")
    .replace(/·\s*/g, "• ");
};

export const formatTalentLabel = (
  label: string,
  parameters: CombatTalentDetail["attributes"]["parameters"],
  talentlevel: number,
): string => {
  return label.replace(/{(.*?)}/g, (_match, p1: string) => {
    // console.log(match, p1);
    const [paramnum, format] = p1.split(":");
    const value = parameters[paramnum][talentlevel - 1];
    const precision = format.includes("F") ? parseInt(format[1]) : 1;

    if (format === "I") {
      // integer
      return `${Math.round(value)}`;
    } else if (format.includes("P")) {
      // percent
      return `${myRound(value * 100, precision)}%`;
    } else if (format.includes("F")) {
      // float
      return `${myRound(value, precision)}`;
    } else {
      return `${value}`;
    }
  });
};

const MAX_LVL_MAP: { [key: string]: number } = {
  "Normal Attack": 11,
  "Elemental Skill": 14,
  "Elemental Burst": 14,
  "Alternate Sprint": 1,
} as const;

export const formatAttributes = (
  attributes: CombatTalentDetail["attributes"],
  category: string,
): { label: string; params: string[] }[] => {
  return attributes.labels.map((label) => {
    const [heading, params] = label.split("|");
    const maxLvl = Math.min(
      attributes.parameters.param1.length,
      MAX_LVL_MAP[category],
    );

    return {
      label: heading,
      params: Array.from(Array(maxLvl).keys()).map((i) =>
        formatTalentLabel(params, attributes.parameters, i + 1),
      ),
    };
  });
};
