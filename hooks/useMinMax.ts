import { Materials, calculateMaterialsRange } from "@/components/MaterialList";
import { Items } from "genshin-db";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

const useMinMax = (
  initialMin: number,
  initialMax: number,
  materialList: Items[][],
): [
  number,
  Dispatch<SetStateAction<number>>,
  number,
  Dispatch<SetStateAction<number>>,
  Materials,
] => {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  // NOTE: need memo
  const materials: Materials = useMemo(
    () =>
      min >= max ? {} : calculateMaterialsRange(materialList, min + 1, max + 1),
    [materialList, min, max],
  );

  return [min, setMin, max, setMax, materials];
};

export default useMinMax;
