import useRange from "../../hooks/useRange";
import { Ascensions, MaterialDataMap } from "../../pages/[name]";
import MaterialList, { calculateMaterialsRange } from "../MaterialList";
import StatsTable from "../StatsTable";
import Section from "./Section";

const AscensionSection: React.FC<{ ascensions: Ascensions }> = ({
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
      <AscensionCalculator
        costs={ascensions.costs}
        materialData={ascensions.materialData}
      />
    </Section>
  );
};

const AscensionCalculator: React.FC<{
  costs: Ascensions["costs"];
  materialData: MaterialDataMap;
}> = ({ costs, materialData }) => {
  const {
    start,
    decrementStart,
    incrementStart,
    end,
    decrementEnd,
    incrementEnd,
    // reset,
  } = useRange(0, 6);

  const totalMaterials = calculateMaterialsRange(costs, start, end);
  console.log(totalMaterials);
  return (
    <div className="flex flex-col">
      <h3>Material Calculator</h3>
      <div className="flex items-center gap-4 text-gold">
        <h4>Start {start}</h4>
        <button className="p-2" onClick={decrementStart}>
          -
        </button>
        <button className="p-2" onClick={incrementStart}>
          +
        </button>
      </div>
      <div className="flex items-center gap-4 text-gold">
        <h4>End {end}</h4>
        <button className="p-2" onClick={decrementEnd}>
          -
        </button>
        <button className="p-2" onClick={incrementEnd}>
          +
        </button>
      </div>
      <MaterialList
        totalMaterials={totalMaterials}
        materialData={materialData}
      />
    </div>
  );
};

export default AscensionSection;
