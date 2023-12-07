import type { Character } from "@/data/types";
import { Section, SectionHeader } from "@/components/ui/section";
import { StatsTable } from "@/components/stats-table";

interface AscensionSectionProps {
  stats: Character["stats"];
}

export function AscensionSection({ stats }: AscensionSectionProps) {
  return (
    <Section className="overflow-hidden">
      <SectionHeader>Ascensions</SectionHeader>
      <StatsTable
        data={stats.data}
        numCols={stats.headings.length}
        topHeadings={stats.headings}
      />
    </Section>
  );
}
