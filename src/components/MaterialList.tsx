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
    <div>
      <div className="flex flex-wrap justify-center gap-4 xl:justify-start">
        {totalMaterials.map(([material, count]) => {
          return (
            <div
              className="flex w-[84px] flex-col items-center gap-2 lg:w-[96px]"
              title={material}
              key={`${material}-${count}`}
            >
              <ItemCard
                label={count.toLocaleString()}
                imgSrc={imageUrl(materialData[material].nameicon)}
                size={96} // NOTE: make equal to lg:w-[??px]
              />
            </div>
          );
        })}
      </div>
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
