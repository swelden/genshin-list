import StatsTable from "@/components/stats-table";
import { Section, SectionHeader } from "@/components/ui/section";
import { CharacterStats } from "@/lib/get-character-details";

export const AscensionSection = ({ stats }: { stats: CharacterStats }) => {
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
};
AscensionSection.displayName = "AscensionSection";
