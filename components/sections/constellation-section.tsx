import { ConstellationInfo } from "@/lib/get-character-details";
import { Section, SectionHeader } from "@/components/ui/section";
import { SectionRow } from "@/components/sections/section-row";

interface ConstellationSectionProps {
  constellations: ConstellationInfo[];
}

export function ConstellationSection({
  constellations,
}: ConstellationSectionProps) {
  return (
    <Section>
      <SectionHeader>Constellations</SectionHeader>
      {constellations.map((constellation, index) => (
        <SectionRow
          ability={constellation}
          isAbsoluteIconPath={true}
          key={`${index}-${constellation.name}`} // NOTE: Aloy has same constellation name for each constellation
        />
      ))}
    </Section>
  );
}
