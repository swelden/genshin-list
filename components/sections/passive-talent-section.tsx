import { TalentInfo } from "@/lib/get-character-details";
import { Section, SectionHeader } from "@/components/ui/section";
import { SectionRow } from "@/components/sections/section-row";

interface PassiveTalentSectionProps {
  passives: TalentInfo["passives"];
}

export function PassiveTalentSection({ passives }: PassiveTalentSectionProps) {
  return (
    <Section>
      <SectionHeader>Passive Talents</SectionHeader>
      {passives.map((passiveTalent) => (
        <SectionRow ability={passiveTalent} key={passiveTalent.name} />
      ))}
    </Section>
  );
}
