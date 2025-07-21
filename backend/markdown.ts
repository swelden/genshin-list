import DOMPurify from "isomorphic-dompurify";

const hexColorToTailwind: Record<string, string> = {
  "#FFD780FF": "text-gold",
  "#FF9999FF": "text-pyro",
  "#80C0FFFF": "text-hydro",
  "#99FF88FF": "text-dendro",
  "#FFACFFFF": "text-electro",
  "#80FFD7FF": "text-anemo",
  "#99FFFFFF": "text-cryo",
  "#FFE699FF": "text-geo",
};

export function formatMarkdown(text: string) {
  return DOMPurify.sanitize(
    text
      .replace(
        // <color=#FFD780FF>content</color> => <span class="text-gold">content</span>
        /<color=(?<hex>#.{8})>(?<content>[^<]*)<\/color>/g,
        (match, ...args) => {
          const hasNamedGroups = typeof args.at(-1) === "object"; // groups is the last argument

          if (hasNamedGroups) {
            const { hex, content } = args.at(-1) as {
              hex: string;
              content: string;
            };

            const tailwindClass = hexColorToTailwind[hex];

            if (tailwindClass !== undefined) {
              return `<span class="${tailwindClass}">${content}</span>`;
            } else {
              return content; // if color is not found, don't add any class
            }
          } else {
            return match; // should never reach here
          }
        },
      )
      // NOTE: $1 is the first capture group
      // {LAYOUT_DEVICE#Action} => Action
      .replace(/\{LAYOUT_(?!PC)[^}]*\}/g, "") // remove all layouts except PC
      .replace(/\{LAYOUT_PC#([^}]*)\}/g, "$1") // only take action after the #
      .replace(/\{LINK.*\}([^}]*)\{\/LINK\}/g, "$1") // remove link tags {LINKN1113000}word{/LINK}
      .replace(
        /<i>([^<]*)<\/i>/g,
        '<i class="text-section-foreground/60">$1</i>',
      )
      .replace(/#/g, "")
      .replace(/\n/g, "<br>")
      .replace(/·\s*/g, "• "),
  );
}
