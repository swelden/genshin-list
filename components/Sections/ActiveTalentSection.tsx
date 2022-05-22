import React, { useState } from "react";
import { Props } from "../../pages/[name]";
import { DropDownIcon } from "../icons";
import StatsTable from "../StatsTable";
import Section from "./Section";
import SectionRow from "./SectionRow";

type Talents = Pick<Props, "talents">;

const ActiveTalentSection: React.FC<Talents> = ({ talents }) => {
  console.log(talents);
  return (
    <Section title="Active Talents" className="overflow-hidden">
      {talents.actives.map((activeTalent) => (
        <SectionRow ability={activeTalent} key={activeTalent.name}>
          <ActiveTalentAttributes talent={activeTalent} />
        </SectionRow>
      ))}
    </Section>
  );
};

const ActiveTalentAttributes: React.FC<{
  talent: Talents["talents"]["actives"][number];
}> = ({ talent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const maxCols = talent.attributes[0].params.length;

  return (
    <div>
      <button className="mt-4 flex" onClick={() => setIsOpen(!isOpen)}>
        {talent.category} Stats
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
