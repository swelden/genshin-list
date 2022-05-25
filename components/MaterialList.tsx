import { Items } from "genshin-db";
import { MaterialDataMap } from "../pages/[name]";
import { imageUrl } from "../utils/urls";
import { ItemCard } from "./Card";

const MaterialList: React.FC<{
  totalMaterials: {
    [key: string]: number;
  };
  materialData: MaterialDataMap;
}> = ({ totalMaterials, materialData }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {Object.entries(totalMaterials)
        .sort(
          (a, b) => materialData[a[0]].sortorder - materialData[b[0]].sortorder
        )
        .map(([material, count]) => {
          return (
            <div
              className="flex w-[84px] flex-col items-center  gap-2 lg:w-[96px]"
              key={material}
            >
              <ItemCard
                label={count.toLocaleString()}
                imgSrc={imageUrl(materialData[material].nameicon)}
                size={96} // NOTE: make equal to lg:w-[??px]
              />
              <span className="hidden text-center text-xs lg:block">
                {material}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export const calculateMaterialsRange = (
  costs: { [key: string]: Items[] },
  start: number, // min is 0
  end: number // max is len of array (not max index)
) => {
  const materials: { [key: string]: number } = {};

  for (const [_key, value] of Object.entries(costs).slice(start, end)) {
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

export default MaterialList;
