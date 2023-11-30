"use client";

import * as React from "react";

import { TalentInfo } from "@/lib/get-character-details";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { Icons } from "@/components/icons";
import { SectionRow } from "@/components/sections/section-row";
import { StatsTable } from "@/components/stats-table";

export const ActiveTalentSection = ({
  actives,
}: {
  actives: TalentInfo["actives"];
}) => {
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
};
ActiveTalentSection.displayName = "ActiveTalentSection";

// TODO: replace with @radix-ui/react-collapsible
const ActiveTalentAttributes = ({
  talent,
}: {
  talent: TalentInfo["actives"][number];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const maxCols = talent.attributes[0].params.length;
  const panelId = `${talent.category.toLowerCase().replace(/\s/g, "-")}-panel`;

  return (
    <div className="mt-4">
      <button
        className="flex max-w-max rounded-full bg-zinc-100 p-2 pl-4 pr-2 ring-1 ring-black/5 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 hover:dark:bg-zinc-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
      >
        <span className="pr-1.5">{talent.category} Stats</span>
        <span className={cn("transition-transform", isOpen && "rotate-180")}>
          <Icons.dropdown className="h-6 w-6 min-w-[1.5rem]" />
        </span>
      </button>

      {isOpen && (
        <div id={panelId}>
          <StatsTable
            data={talent.attributes}
            numCols={maxCols}
            topHeadings={Array.from(Array(maxCols).keys()).map(
              (lvl) => `Lv.${lvl + 1}`,
            )}
          />
        </div>
      )}
    </div>
  );
};
ActiveTalentAttributes.displayName = "ActiveTalentAttributes";
