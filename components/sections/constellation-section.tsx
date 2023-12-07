import type { Constellation } from "@/data/types";
import { Section, SectionHeader } from "@/components/ui/section";
import { SectionRow } from "@/components/sections/section-row";

interface ConstellationSectionProps {
  constellations: Constellation[];
}

export function ConstellationSection({
  constellations,
}: ConstellationSectionProps) {
  return (
    <Section>
      <SectionHeader>Constellations</SectionHeader>
      {constellations.map((constellation, index) => (
        <SectionRow
          talent={constellation}
          isAbsoluteIconPath={true}
          key={`${index}-${constellation.name}`} // NOTE: Aloy has same constellation name for each constellation
        />
      ))}
    </Section>
  );
}
