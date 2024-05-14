"use client";

import { useHydrateAtoms } from "jotai/utils";

import type { Item } from "@/backend/schema";
import type { AllMaterialInfo } from "@/data/types";
import {
  attackMaxAtom,
  burstMaxAtom,
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
    [levelMaxAtom, levelOptions.length - 1],
    [talentOptionsAtom, talentOptions],
    [talentMatsAtom, talentMats],
    [attackMaxAtom, talentOptions.length - 1],
    [skillMaxAtom, talentOptions.length - 1],
    [burstMaxAtom, talentOptions.length - 1],
  ]);
  return children;
}
