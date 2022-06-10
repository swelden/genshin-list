import { TalentInfo } from "../../pages/[name]";
import Section from "./Section";
import SectionRow from "./SectionRow";

const PassiveTalentSection: React.FC<{
  passives: TalentInfo["passives"];
}> = ({ passives }) => {
  console.log(passives);
  return (
    <Section title="Passive Talents">
      {passives.map((passiveTalent) => (
        <SectionRow ability={passiveTalent} key={passiveTalent.name} />
      ))}
    </Section>
  );
};

export default PassiveTalentSection;