import { CombatTalentDetail } from "genshin-db";

import { myRound } from "@/lib/utils";

const ElementColor = {
  Pyro: "text-pyro",
  Hydro: "text-hydro",
  Wet: "text-hydro",
  Dendro: "text-dendro",
  Electro: "text-electro",
  Freikugel: "text-electro",
  Anemo: "text-anemo",
  Cryo: "text-cryo",
  Geo: "text-geo",
} as const;

function createElementSpanRegExp() {
  const invalidBehindWords = ["\\d"].join("|");
  const validBehindWords = ["AoE"].join("|");
  const elements: string = Object.keys(ElementColor).join("|");
  // validAheadWords => words that are also highlighted the element color
  // ex: [Shenhe] Cryo CRIT DMG => Cryo should still be highlighted but not CRIT DMG
  // ex: Cryo DMG => Cryo and DMG would both be highlighted
  const validAheadWords = [
    "DMG",
    "RES",
    "Bonus",
    "Infusion",
    "Construct",
    "related Elemental Reactions?",
  ].join("|");
  // invalidEndChars & invalidEndWords => if these follow element then no color is added, including element
  // ex: [Dori] Electro Swirl => neither Electro or Swirl are highlighted
  const invalidEndChars = "[a-zA-Z0-9_-]";
  const invalidEndWords = ["Swirl", "Explosion", "Pearl"].join("|");

  const invalidBehindRegExp = `(?<!(${invalidBehindWords})(\\s|-))`;
  const validBehindRegExp = `((${validBehindWords})(\\s|-))*`;
  const indicatorRegExp = `(?<indicator>${elements})`;
  const validAheadRegExp = `((\\s|-)(${validAheadWords}))*`;
  const invalidEndRegExp = `(?!(${invalidEndChars})|((\\s|-)(${invalidEndWords}))+)`;

  return new RegExp(
    `${invalidBehindRegExp}(${validBehindRegExp}${indicatorRegExp}${validAheadRegExp})${invalidEndRegExp}`,
    "g",
  );
}

// NOTE: might sanitize because I don't have control over text
export function formatMarkdown(text: string) {
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
}

export function formatTalentLabel(
  label: string,
  parameters: CombatTalentDetail["attributes"]["parameters"],
  talentlevel: number,
) {
  return label.replace(/{(.*?)}/g, (_match, p1: string) => {
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
}

const MAX_LVL_MAP: { [key: string]: number } = {
  "Normal Attack": 11,
  "Elemental Skill": 14,
  "Elemental Burst": 14,
  "Alternate Sprint": 1,
} as const;

export function formatAttributes(
  attributes: CombatTalentDetail["attributes"],
  category: string,
) {
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
}
