import * as React from "react";

import type { Item } from "@/backend/schema";

export function useMinMax(
  initialMin: number,
  initialMax: number,
  materialList: Item[][],
) {
  const [min, setMin] = React.useState(initialMin);
  const [max, setMax] = React.useState(initialMax);

  // NOTE: need memo
  const materials = React.useMemo(
    () =>
      min >= max ? {} : calculateMaterialsRange(materialList, min + 1, max + 1),
    [materialList, min, max],
  );

  return [min, setMin, max, setMax, materials] as const;
}

function calculateMaterialsRange(
  costs: Item[][],
  start: number, // min is 0
  end: number, // max is len of array (not max index)
) {
  const materials: Record<string, number> = {};

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
}
