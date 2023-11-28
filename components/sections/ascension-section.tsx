import StatsTable from "@/components/stats-table";
import { Section, SectionHeader } from "@/components/ui/section";
import { CharacterStats } from "@/lib/get-character-details";

const AscensionSection: React.FC<{ stats: CharacterStats }> = ({ stats }) => {
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

export default AscensionSection;
