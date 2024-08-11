"use client";

import { useHydrateAtoms } from "jotai/utils";

import type { Item } from "@/backend/schema";
import type { AllMaterialInfo } from "@/data/types";
import {
  attackMaxAtom,
  burstMaxAtom,
  getMinMatOption,
  levelMatsAtom,
  levelMaxAtom,
  levelOptionsAtom,
  materialNameToInfoAtom,
  skillMaxAtom,
  talentMatsAtom,
  talentOptionsAtom,
} from "@/hooks/use-materials";
import type { SelectOption } from "@/components/ui/select";

interface HydrateAtomsProps {
  materials: AllMaterialInfo;
  levelOptions: SelectOption<number>[];
  levelMats: Item[][];
  talentOptions: SelectOption<number>[];
  talentMats: Item[][];
  children: React.ReactNode;
}

export function HydrateMaterialAtoms({
  materials,
  levelOptions,
  levelMats,
  talentOptions,
  talentMats,
  children,
}: HydrateAtomsProps) {
  useHydrateAtoms([
    [materialNameToInfoAtom, materials.nameToInfo],
    [levelOptionsAtom, levelOptions],
    [levelMatsAtom, levelMats],
    [levelMaxAtom, levelOptions.at(-1) ?? getMinMatOption()],
    [talentOptionsAtom, talentOptions],
    [talentMatsAtom, talentMats],
    [attackMaxAtom, talentOptions.at(-1) ?? getMinMatOption()],
    [skillMaxAtom, talentOptions.at(-1) ?? getMinMatOption()],
    [burstMaxAtom, talentOptions.at(-1) ?? getMinMatOption()],
  ]);
  return children;
}
