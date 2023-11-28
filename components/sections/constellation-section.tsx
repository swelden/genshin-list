import { SectionRow } from "@/components/sections/section-row";
import { Section, SectionHeader } from "@/components/ui/section";
import { ConstellationInfo } from "@/lib/get-character-details";

export const ConstellationSection = ({
  constellations,
}: {
  constellations: ConstellationInfo[];
}) => {
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
};
ConstellationSection.displayName = "ConstellationSection";
