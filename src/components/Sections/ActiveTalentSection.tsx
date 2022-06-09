import React, { useState } from "react";
import { TalentInfo } from "../../pages/[name]";
import { DropDownIcon } from "../icons";
import StatsTable from "../StatsTable";
import Section from "./Section";
import SectionRow from "./SectionRow";
// import Button from "../Button";

const ActiveTalentSection: React.FC<{ actives: TalentInfo["actives"] }> = ({
  actives,
}) => {
  console.log(actives);
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
        className="flex max-w-max rounded-full bg-zinc-100 p-2 pl-4 pr-2 ring-1 ring-black/5 ring-offset-white transition-colors hover:bg-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 dark:bg-zinc-700 dark:ring-offset-zinc-800 hover:dark:bg-zinc-600 focus-visible:dark:ring-yellow-600"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="pr-1.5">{talent.category} Stats</span>
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <DropDownIcon />
        </span>
      </button>

      {isOpen && (
        <StatsTable
          data={talent.attributes}
          numCols={maxCols}
          topHeadings={Array.from(Array(maxCols).keys()).map(
            (lvl) => `Lv.${lvl + 1}`
          )}
        />
      )}
    </div>
  );
};

export default ActiveTalentSection;
