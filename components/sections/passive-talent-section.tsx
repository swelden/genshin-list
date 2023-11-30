import { TalentInfo } from "@/lib/get-character-details";
import { Section, SectionHeader } from "@/components/ui/section";
import { SectionRow } from "@/components/sections/section-row";

export const PassiveTalentSection = ({
  passives,
}: {
  passives: TalentInfo["passives"];
}) => {
  return (
    <Section>
      <SectionHeader>Passive Talents</SectionHeader>
      {passives.map((passiveTalent) => (
        <SectionRow ability={passiveTalent} key={passiveTalent.name} />
      ))}
    </Section>
  );
};
PassiveTalentSection.displayName = "PassiveTalentSection";
