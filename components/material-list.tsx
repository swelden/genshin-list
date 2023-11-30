import { ItemCard } from "@/components/card-templates";
import { useMaterialContext } from "@/contexts/material-context";
import { MaterialDataMap } from "@/lib/get-character-details";
import { formatImageUrl } from "@/lib/utils";
import { Items } from "genshin-db";

export interface Materials {
  [key: string]: number;
}

export default function MaterialList({
  materialData,
}: {
  materialData: MaterialDataMap;
}) {
  const { characterMaterials, talentMaterials } = useMaterialContext()!;

  // NOTE: shouldn't need to use useMemo
  const totalMaterials = Object.entries(
    mergeMaterials(characterMaterials, talentMaterials),
  ).sort(([aName], [bName]) => {
    const aIsCharMat = characterMaterials[aName] !== undefined;
    const bIsCharMat = characterMaterials[bName] !== undefined;

    if (aIsCharMat === bIsCharMat) {
      return materialData[aName].sortorder - materialData[bName].sortorder;
    } else if (aIsCharMat) {
      return -1; // sort a before b
    } else {
      return 1; // sort b before a
    }
  });

  return (
    // NOTE: might remove mora card and replace it with "Required (mora icon) [Amount]" center below cards
    <div className="flex flex-wrap justify-center gap-4 xl:justify-end">
      {totalMaterials.map(([material, count]) => {
        return (
          <div
            className="w-[5.25rem] lg:w-[5.875rem] 2xl:w-[6.5rem]"
            title={material}
            key={`${material}`}
          >
            <ItemCard
              label={count.toLocaleString()}
              src={formatImageUrl(materialData[material].nameicon)}
              alt={material}
              size={104} // NOTE: make equal to lg:w-[??px] on max system font size
              unoptimized={true}
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
}

export const calculateMaterialsRange = (
  costs: Items[][],
  start: number, // min is 0
  end: number, // max is len of array (not max index)
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
