import { CharacterStats } from "@/lib/get-character-details";
import { Section, SectionHeader } from "@/components/ui/section";
import { StatsTable } from "@/components/stats-table";

interface AscensionSectionProps {
  stats: CharacterStats;
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
