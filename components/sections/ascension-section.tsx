import Section from "@/components/sections/section";
import StatsTable from "@/components/stats-table";
import { CharacterStats } from "@/lib/get-character-details";

const AscensionSection: React.FC<{ stats: CharacterStats }> = ({ stats }) => {
  return (
    <Section title="Ascensions" className="overflow-hidden">
      <StatsTable
        data={stats.data}
        numCols={stats.headings.length}
        topHeadings={stats.headings}
      />
    </Section>
  );
};

export default AscensionSection;
