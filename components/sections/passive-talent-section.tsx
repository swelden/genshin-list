import type { Passive } from "@/data/types";
import {
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { SectionRow } from "@/components/sections/section-row";

interface PassiveTalentSectionProps {
  passives: Passive[];
}

export function PassiveTalentSection({ passives }: PassiveTalentSectionProps) {
  return (
    <Section>
      <SectionHeader>Passive Talents</SectionHeader>
      <Separator className="my-4" invert />
      <SectionContent>
        {passives.map((passiveTalent) => (
          <SectionRow talent={passiveTalent} key={passiveTalent.name} />
        ))}
      </SectionContent>
    </Section>
  );
}
