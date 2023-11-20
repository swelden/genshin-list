import { CharacterStats } from "@/backend/name_page";
import Section from "@/components/Sections/Section";
import StatsTable from "@/components/StatsTable";

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
