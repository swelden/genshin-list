import { useCallback, useState } from "react";
import { Ascensions, MaterialDataMap } from "../../pages/[name]";
import DoubleRangeSlider from "../DoubleRangeSlider/DoubleRangeSlider";
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
  const [totalMaterials, setTotalMaterials] = useState({});

  const updateMaterials = useCallback(
    (start: number, end: number) => {
      setTotalMaterials(calculateMaterialsRange(costs, start, end));
    },
    [costs]
  );

  return (
    <div className="flex flex-col gap-4">
      <h3>Material Calculator</h3>
      <DoubleRangeSlider
        initialMin={0}
        initialMax={6}
        min={0}
        max={6}
        step={1}
        gap={1}
        onChange={updateMaterials}
      />

      <MaterialList
        totalMaterials={totalMaterials}
        materialData={materialData}
      />
    </div>
  );
};

export default AscensionSection;
