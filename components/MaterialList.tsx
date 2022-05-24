import { Items } from "genshin-db";
import { Props } from "../pages/[name]";
import { imageUrl } from "../utils/urls";
import { ItemCard } from "./Card";

type Ascension = Pick<Props, "ascensions">;
type MaterialDataMap = Ascension["ascensions"]["materialData"];

const MaterialList: React.FC<{
  totalMaterials: {
    [key: string]: number;
  };
  materialData: MaterialDataMap;
}> = ({ totalMaterials, materialData }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {Object.entries(totalMaterials)
        .sort(
          (a, b) => materialData[a[0]].sortorder - materialData[b[0]].sortorder
        )
        .map(([material, count]) => {
          return (
            <div
              className="flex w-[92px] flex-col  items-center gap-2"
              key={material}
            >
              <ItemCard
                label={count.toLocaleString()}
                imgSrc={imageUrl(materialData[material].nameicon)}
              />
              <span className="text-center text-xs">{material}</span>
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
