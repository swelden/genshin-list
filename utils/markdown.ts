import { Props } from "../pages/[name]";

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
    "Geo"
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
    "g"
  );
};

// const elementSpanRegExp = createElementSpanRegExp();
// console.log(elementSpanRegExp);

// NOTE: might sanitize because I don't have control over text
export const formatMarkdown = (text: string): string => {
  return text
    .replace(
      /\*\*([^*]+)\*\*/g, // **text** -> <span>text</span>
      '<span class="text-gold">$1</span>'
    )
    .replace(createElementSpanRegExp(), (match, ...params) => {
      // groups is the last argument
      const indicator: keyof typeof ElementColor = params.at(-1)["indicator"];
      return `<span class="${ElementColor[indicator]}">${match}</span>`;
    })
    .replace(/\n/g, "<br>");
};

type Parameters = Pick<
  Props,
  "talents"
>["talents"]["actives"][number]["attributes"]["parameters"];

// NOTE: might format the labels in the backend
export const formatTalentLabels = (
  label: string,
  parameters: Parameters,
  talentlevel: number
): string => {
  return label.replace(/{(.*?)}/g, (match, p1) => {
    // console.log(match, p1);
    const [paramnum, format] = p1.split(":");
    const value = parameters[paramnum][talentlevel - 1];
    if (format === "I") {
      // integer
      return `${value}`;
    } else if (format.includes("P")) {
      // percent
      return `${(value * 100).toFixed(format[1])}%`;
    } else if (format.includes("F")) {
      // float
      // TODO: round to n position based on number after F (like F2 rounds to 2 decimal places)
      // TODO: remove trailing zero if exists
      return `${value.toFixed(format[1])}`;
    } else {
      return `${value}`;
    }
  });
};
