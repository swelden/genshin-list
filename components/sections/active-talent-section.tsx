"use client";

import { Icons } from "@/components/icons";
import Section from "@/components/sections/section";
import SectionRow from "@/components/sections/section-row";
import StatsTable from "@/components/stats-table";
import { TalentInfo } from "@/lib/get-character-details";
import { useState } from "react";
// import Button from "@/components/button";

const ActiveTalentSection: React.FC<{ actives: TalentInfo["actives"] }> = ({
  actives,
}) => {
  // console.log(actives);

  return (
    <Section title="Active Talents" className="overflow-hidden">
      {actives.map((activeTalent) => (
        <SectionRow ability={activeTalent} key={activeTalent.name}>
          <ActiveTalentAttributes talent={activeTalent} />
        </SectionRow>
      ))}
    </Section>
  );
};

const ActiveTalentAttributes: React.FC<{
  talent: TalentInfo["actives"][number];
}> = ({ talent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const maxCols = talent.attributes[0].params.length;
  const panelId = `${talent.category.toLowerCase().replace(/\s/g, "-")}-panel`;

  return (
    <div className="mt-4">
      {/* <Button
        className="max-w-max pl-4 pr-2"
        onClick={() => setIsOpen(!isOpen)}
        isColorInversed={true}
      >
        <span className="pr-1.5">{talent.category} Stats</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <DropDownIcon />
        </span>
      </Button> */}

      <button
        className="key-focus key-focus-section flex max-w-max rounded-full bg-zinc-100 p-2 pl-4 pr-2 ring-1 ring-black/5 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 hover:dark:bg-zinc-600"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
      >
        <span className="pr-1.5">{talent.category} Stats</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
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

export default ActiveTalentSection;
