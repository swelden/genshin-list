"use client";

import { formatImageUrl } from "@/lib/utils";
import {
  useCalculatedMaterials,
  useMaterialNameToInfo,
} from "@/hooks/use-materials";
import { ItemCard } from "@/components/card-templates";

interface MaterialListProps {}

export function MaterialList({}: MaterialListProps) {
  const calculatedMaterials = useCalculatedMaterials();
  const materialNameToInfo = useMaterialNameToInfo();

  return (
    // NOTE: might remove mora card and replace it with "Required (mora icon) [Amount]" center below cards
    <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
      {calculatedMaterials.map(([material, count]) => {
        return (
          <div
            className="w-21 lg:w-24"
            title={material}
            key={`${material}`}
          >
            <ItemCard
              label={count}
              src={formatImageUrl(materialNameToInfo[material]!.icon)}
              alt={material}
              size={104} // NOTE: make equal to lg:w-[??px] on max system font size
              unoptimized={true}
            />
          </div>
        );
      })}
      {calculatedMaterials.length === 0 && (
        <div className="min-w-max rounded bg-linear-to-b from-[#323947] to-[#4a5366] p-4 text-white">
          No Materials
        </div>
      )}
    </div>
  );
}
