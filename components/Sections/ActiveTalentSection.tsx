import { Props } from "../../pages/[name]";
import Section from "./Section";
import SectionRow from "./SectionRow";

const ActiveTalentSection: React.FC<Pick<Props, "talents">> = ({ talents }) => {
  console.log(talents);
  return (
    <Section title="Active Talents">
      {talents.actives.map((activeTalent) => (
        <SectionRow ability={activeTalent} key={activeTalent.name} />
      ))}
    </Section>
  );
};

export default ActiveTalentSection;
