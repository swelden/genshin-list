import type { Active } from "@/data/types";
import {
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithState,
} from "@/components/ui/collapsible";
import { Section, SectionHeader } from "@/components/ui/section";
import { Icons } from "@/components/icons";
import { SectionRow } from "@/components/sections/section-row";
import { StatsTable } from "@/components/stats-table";

interface ActiveTalentSectionProps {
  actives: Active[];
}

export function ActiveTalentSection({ actives }: ActiveTalentSectionProps) {
  return (
    <Section className="overflow-hidden">
      <SectionHeader>Active Talents</SectionHeader>
      {actives.map((activeTalent) => (
        <SectionRow talent={activeTalent} key={activeTalent.name}>
          <ActiveTalentAttributes talent={activeTalent} />
        </SectionRow>
      ))}
    </Section>
  );
}

interface ActiveTalentAttributesProps {
  talent: Active;
}

function ActiveTalentAttributes({ talent }: ActiveTalentAttributesProps) {
  const numCols = talent.attributes[0]!.params.length;

  return (
    <CollapsibleWithState className="group mt-4">
      <CollapsibleTrigger asChild>
        <button className="flex max-w-max rounded-full bg-zinc-100 p-2 pl-4 ring-1 ring-black/5 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 hover:dark:bg-zinc-600">
          <span className="pr-1.5">{talent.category} Stats</span>
          <Icons.dropdown className="h-6 w-6 min-w-[1.5rem] transition-transform group-data-[state=open]:rotate-180" />
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <StatsTable
          data={talent.attributes}
          topHeadings={Array.from(Array(numCols).keys()).map(
            (lvl) => `Lv.${lvl + 1}`,
          )}
        />
      </CollapsibleContent>
    </CollapsibleWithState>
  );
}
