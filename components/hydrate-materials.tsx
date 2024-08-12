"use client";

import { useHydrateAtoms } from "jotai/utils";

import type { Item } from "@/backend/schema";
import type { AllMaterialInfo } from "@/data/types";
import {
  attackMaxAtom,
  attackMinAtom,
  burstMaxAtom,
  burstMinAtom,
  getMinMatOption,
  levelMatsAtom,
  levelMaxAtom,
  levelMinAtom,
  levelOptionsAtom,
  materialNameToInfoAtom,
  skillMaxAtom,
  skillMinAtom,
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
  const minTalentOption = talentOptions.at(0) ?? getMinMatOption();
  const maxTalentOption = talentOptions.at(-1) ?? getMinMatOption();

  useHydrateAtoms([
    [materialNameToInfoAtom, materials.nameToInfo],

    // ASCENSION/LEVEL
    [levelOptionsAtom, levelOptions],
    [levelMatsAtom, levelMats],

    [levelMinAtom, levelOptions.at(0) ?? getMinMatOption()],
    [levelMaxAtom, levelOptions.at(-1) ?? getMinMatOption()],

    // TALENTS
    [talentOptionsAtom, talentOptions],
    [talentMatsAtom, talentMats],

    [attackMinAtom, minTalentOption],
    [attackMaxAtom, maxTalentOption],

    [skillMinAtom, minTalentOption],
    [skillMaxAtom, maxTalentOption],

    [burstMinAtom, minTalentOption],
    [burstMaxAtom, maxTalentOption],
  ]);
  return children;
}
