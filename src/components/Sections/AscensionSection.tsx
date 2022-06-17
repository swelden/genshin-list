import { CharacterStats } from "../../backend/name_page";
import StatsTable from "../StatsTable";
import Section from "./Section";

const AscensionSection: React.FC<{ stats: CharacterStats }> = ({ stats }) => {
  console.log(stats);
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
