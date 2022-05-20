import React, { useState } from "react";
import { Props } from "../../pages/[name]";
import { formatTalentLabels } from "../../utils/markdown";
import { DropDownIcon } from "../icons";
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

const MaxLvlMap: { [key: string]: number } = {
  "Normal Attack": 11,
  "Elemental Skill": 14,
  "Elemental Burst": 14,
  "Alternate Sprint": 1,
} as const;

const ActiveTalentAttributes: React.FC<{
  talent: Talents["talents"]["actives"][number];
}> = ({ talent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const maxLvl = Math.min(
    talent.attributes.parameters.param1.length,
    MaxLvlMap[talent.category]
  );

  return (
    <div>
      <button className="mt-4 flex" onClick={() => setIsOpen(!isOpen)}>
        {talent.category} Stats
        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <DropDownIcon />
        </span>
      </button>
      {isOpen && (
        <div
          className={`mt-4 w-full overflow-x-auto rounded-lg border ${sharedBorderClasses}`}
        >
          <div
            className={`overflow-hidden ${maxLvl === 1 ? "w-auto" : "w-max"}`}
          >
            <table className="w-full text-left text-sm">
              <tbody>
                <tr className={`border-b ${sharedBorderClasses}`}>
                  <TableHeading>Level</TableHeading>
                  {Array.from(Array(maxLvl).keys()).map((i) => (
                    <TableHeading key={i}>{`Lv.${i + 1}`}</TableHeading>
                  ))}
                </tr>
                {talent.attributes.labels.map((label) => {
                  const [heading, params] = label.split("|");

                  return (
                    <tr
                      key={heading}
                      className={`border-b last:border-0 ${sharedBorderClasses}`}
                    >
                      <TableHeading>{heading}</TableHeading>
                      {Array.from(Array(maxLvl).keys()).map((i) => (
                        <TableCell key={i}>
                          {formatTalentLabels(
                            params,
                            talent.attributes.parameters,
                            i + 1
                          )}
                        </TableCell>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const sharedBorderClasses = "border-black/10 dark:border-white/10";
const sharedCellClasses = "border-r p-3 last:border-r-0";

const TableHeading: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <th
    className={`w-36 bg-zinc-100 font-normal text-black/50 dark:bg-zinc-900/50 dark:text-white/30 ${sharedBorderClasses} ${sharedCellClasses}`}
  >
    {children}
  </th>
);

const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <td
    className={`min-w-[7rem] text-black/90 last:border-r-0 dark:text-white/90 ${sharedBorderClasses} ${sharedCellClasses}`}
  >
    {children}
  </td>
);

export default ActiveTalentSection;
