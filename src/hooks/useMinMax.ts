import { Items } from "genshin-db";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { calculateMaterialsRange, Materials } from "../components/MaterialList";

const useMinMax = (
  initialMin: number,
  initialMax: number,
  materialList: Items[][]
): [
  number,
  Dispatch<SetStateAction<number>>,
  number,
  Dispatch<SetStateAction<number>>,
  Materials
] => {
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const [materials, setMaterials] = useState<Materials>({});

  useEffect(() => {
    min >= max
      ? setMaterials({})
      : setMaterials(calculateMaterialsRange(materialList, min + 1, max + 1));
  }, [setMaterials, materialList, min, max]);

  return [min, setMin, max, setMax, materials];
};

export default useMinMax;
