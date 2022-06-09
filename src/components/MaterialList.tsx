import { Items } from "genshin-db";
import { MaterialDataMap } from "../pages/[name]";
import { imageUrl } from "../utils/urls";
import { ItemCard } from "./Card";
import { MaterialList } from "./Sections/MaterialCalculatorSection";

export interface Materials {
  [key: string]: number;
}

const MaterialList: React.FC<{
  totalMaterials: MaterialList;
  materialData: MaterialDataMap;
}> = ({ totalMaterials, materialData }) => {
  return (
    // NOTE: might remove mora card and replace it with "Required (mora icon) [Amount]" center below cards
    <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
      {totalMaterials.map(([material, count]) => {
        return (
          <div
            className="w-[84px] lg:w-[94px] 2xl:w-[98px]"
            title={material}
            key={`${material}`}
          >
            <ItemCard
              label={count.toLocaleString()}
              imgSrc={imageUrl(materialData[material].nameicon)}
              size={98} // NOTE: make equal to lg:w-[??px]
              smallIcon={material === "Mora"}
            />
          </div>
        );
      })}
      {totalMaterials.length === 0 && (
        <div className="min-w-max rounded bg-gradient-to-b from-[#323947] to-[#4a5366] p-4 text-white">
          No Materials
        </div>
      )}
    </div>
  );
};

export const calculateMaterialsRange = (
  costs: Items[][],
  start: number, // min is 0
  end: number // max is len of array (not max index)
): Materials => {
  const materials: Materials = {};

  for (const value of costs.slice(start, end)) {
    for (const { name, count } of value) {
      if (materials.hasOwnProperty(name)) {
        materials[name] += count;
      } else {
        materials[name] = count;
      }
    }
  }

  return materials;
};

export const mergeMaterials = (...materials: Materials[]): Materials => {
  const merged: Materials = {};

  materials.forEach((material) => {
    for (const [name, count] of Object.entries(material)) {
      if (merged.hasOwnProperty(name)) {
        merged[name] += count;
      } else {
        merged[name] = count;
      }
    }
  });

  return merged;
};

export default MaterialList;
