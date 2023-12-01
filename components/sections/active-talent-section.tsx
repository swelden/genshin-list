"use client";

import * as React from "react";

import { TalentInfo } from "@/lib/get-character-details";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Section, SectionHeader } from "@/components/ui/section";
import { Icons } from "@/components/icons";
import { SectionRow } from "@/components/sections/section-row";
import { StatsTable } from "@/components/stats-table";

interface ActiveTalentSectionProps {
  actives: TalentInfo["actives"];
}

export function ActiveTalentSection({ actives }: ActiveTalentSectionProps) {
  return (
    <Section className="overflow-hidden">
      <SectionHeader>Active Talents</SectionHeader>
      {actives.map((activeTalent) => (
        <SectionRow ability={activeTalent} key={activeTalent.name}>
          <ActiveTalentAttributes talent={activeTalent} />
        </SectionRow>
      ))}
    </Section>
  );
}

interface ActiveTalentAttributesProps {
  talent: TalentInfo["actives"][number];
}

// TODO: extract this to separate file due to "use-client"
function ActiveTalentAttributes({ talent }: ActiveTalentAttributesProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const maxCols = talent.attributes[0].params.length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
      <CollapsibleTrigger asChild>
        <button className="flex max-w-max rounded-full bg-zinc-100 p-2 pl-4 pr-2 ring-1 ring-black/5 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 hover:dark:bg-zinc-600">
          <span className="pr-1.5">{talent.category} Stats</span>
          <span className={cn("transition-transform", isOpen && "rotate-180")}>
            <Icons.dropdown className="h-6 w-6 min-w-[1.5rem]" />
          </span>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <StatsTable
          data={talent.attributes}
          numCols={maxCols}
          topHeadings={Array.from(Array(maxCols).keys()).map(
            (lvl) => `Lv.${lvl + 1}`,
          )}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
