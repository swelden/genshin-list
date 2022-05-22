import { Props } from "../../pages/[name]";
import StatsTable from "../StatsTable";
import Section from "./Section";

const AscensionSection: React.FC<Pick<Props, "ascensions">> = ({
  ascensions,
}) => {
  console.log(ascensions);
  return (
    <Section title="Ascensions" className="overflow-hidden">
      <StatsTable
        data={ascensions.stats.data}
        numCols={ascensions.stats.headings.length}
        topHeadings={ascensions.stats.headings}
      />
    </Section>
  );
};

export default AscensionSection;
