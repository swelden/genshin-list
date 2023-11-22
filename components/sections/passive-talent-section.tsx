import Section from "@/components/sections/section";
import SectionRow from "@/components/sections/section-row";
import { TalentInfo } from "@/lib/name_page";

const PassiveTalentSection: React.FC<{
  passives: TalentInfo["passives"];
}> = ({ passives }) => {
  // console.log(passives);

  return (
    <Section title="Passive Talents">
      {passives.map((passiveTalent) => (
        <SectionRow ability={passiveTalent} key={passiveTalent.name} />
      ))}
    </Section>
  );
};

export default PassiveTalentSection;
