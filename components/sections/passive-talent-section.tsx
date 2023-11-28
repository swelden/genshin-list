import SectionRow from "@/components/sections/section-row";
import { Section, SectionHeader } from "@/components/ui/section";
import { TalentInfo } from "@/lib/get-character-details";

const PassiveTalentSection: React.FC<{
  passives: TalentInfo["passives"];
}> = ({ passives }) => {
  return (
    <Section>
      <SectionHeader>Passive Talents</SectionHeader>
      {passives.map((passiveTalent) => (
        <SectionRow ability={passiveTalent} key={passiveTalent.name} />
      ))}
    </Section>
  );
};

export default PassiveTalentSection;
