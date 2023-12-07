import type { Passive } from "@/data/types";
import { Section, SectionHeader } from "@/components/ui/section";
import { SectionRow } from "@/components/sections/section-row";

interface PassiveTalentSectionProps {
  passives: Passive[];
}

export function PassiveTalentSection({ passives }: PassiveTalentSectionProps) {
  return (
    <Section>
      <SectionHeader>Passive Talents</SectionHeader>
      {passives.map((passiveTalent) => (
        <SectionRow talent={passiveTalent} key={passiveTalent.name} />
      ))}
    </Section>
  );
}
