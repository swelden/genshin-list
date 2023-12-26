import type { Constellation } from "@/data/types";
import {
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
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
      <Separator className="my-4" invert />
      <SectionContent>
        {constellations.map((constellation, index) => (
          <SectionRow
            talent={constellation}
            key={`${index}-${constellation.name}`} // Aloy has same constellation name for each constellation
          />
        ))}
      </SectionContent>
    </Section>
  );
}
