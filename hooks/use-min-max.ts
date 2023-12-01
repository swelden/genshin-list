import * as React from "react";
import { Items } from "genshin-db";

import { calculateMaterialsRange, Materials } from "@/components/material-list";

export function useMinMax(
  initialMin: number,
  initialMax: number,
  materialList: Items[][],
): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  number,
  React.Dispatch<React.SetStateAction<number>>,
  Materials,
] {
  const [min, setMin] = React.useState(initialMin);
  const [max, setMax] = React.useState(initialMax);

  // NOTE: need memo
  const materials: Materials = React.useMemo(
    () =>
      min >= max ? {} : calculateMaterialsRange(materialList, min + 1, max + 1),
    [materialList, min, max],
  );

  return [min, setMin, max, setMax, materials];
}
