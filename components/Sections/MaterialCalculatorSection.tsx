import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { MaterialDataMap, MaterialInfo } from "../../pages/[name]";
import MaterialList, { calculateMaterialsRange } from "../MaterialList";
import Section from "./Section";

const MaterialCalculatorSection: React.FC<{ materials: MaterialInfo }> = ({
  materials,
}) => {
  console.log(materials);

  return (
    <Section title="Material Calculator">
      <AscensionCalculator
        levels={materials.characterCosts}
        materialData={materials.materialData}
      />
    </Section>
  );
};

const AscensionCalculator: React.FC<{
  levels: MaterialInfo["characterCosts"];
  materialData: MaterialDataMap;
}> = ({ levels, materialData }) => {
  const [totalMaterials, setTotalMaterials] = useState({});
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Object.keys(levels).length - 1);

  const [levelKeys, levelMats] = useMemo(() => {
    const levelKeys = Object.keys(levels).sort();
    const levelMats = levelKeys.map((key) => levels[key]);
    return [levelKeys, levelMats];
  }, [levels]);

  useEffect(() => {
    min >= max
      ? setTotalMaterials({})
      : setTotalMaterials(calculateMaterialsRange(levelMats, min + 1, max + 1));
  }, [levelMats, min, max]);

  return (
    <div className="flex flex-col gap-4">
      <LevelSelector
        label="Current Level"
        levelKeys={levelKeys}
        currentValue={min}
        setValue={setMin}
      />
      <LevelSelector
        label="Intended Level"
        levelKeys={levelKeys}
        currentValue={max}
        setValue={setMax}
      />
      <MaterialList
        totalMaterials={totalMaterials}
        materialData={materialData}
      />
    </div>
  );
};

const LevelSelector: React.FC<{
  label: string;
  levelKeys: string[];
  currentValue: number;
  setValue: Dispatch<SetStateAction<number>>;
}> = ({ label, levelKeys, currentValue, setValue }) => {
  return (
    <div>
      <h3 className="mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">
        {levelKeys.map((lvl, index) => (
          <button
            className={`h-10 w-10 rounded-full border-2 ${
              index === currentValue
                ? "bg-gray-700"
                : "border-gray-400 text-gray-400"
            }`}
            onClick={() => setValue(index)}
            key={lvl}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MaterialCalculatorSection;
