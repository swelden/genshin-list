import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";

import type { Item } from "@/backend/schema";
import type { AllMaterialInfo } from "@/data/types";
import { sortStringAsNumber } from "@/lib/utils";
import type { DropdownOption } from "@/components/ui/dropdown-menu";

// NOTE: exported atoms are initialized with useHydrateAtom

export const materialNameToInfoAtom = atom<AllMaterialInfo["nameToInfo"]>({});

// ASCENSION/LEVEL
export const levelOptionsAtom = atom<DropdownOption<number>[]>([]);
export const levelMatsAtom = atom<Item[][]>([]);

const levelMinAtom = atom(0);
export const levelMaxAtom = atom(13);

// TALENTS
export const talentOptionsAtom = atom<DropdownOption<number>[]>([]);
export const talentMatsAtom = atom<Item[][]>([]);

const attackMinAtom = atom(0);
export const attackMaxAtom = atom(9);

const skillMinAtom = atom(0);
export const skillMaxAtom = atom(9);

const burstMinAtom = atom(0);
export const burstMaxAtom = atom(9);

// MATERIALS
const characterMaterialsAtom = atom((get) =>
  calculateMaterialsRange(
    get(levelMatsAtom),
    get(levelMinAtom),
    get(levelMaxAtom),
  ),
);

const talentMaterialsAtom = atom((get) =>
  mergeMaterials(
    calculateMaterialsRange(
      get(talentMatsAtom),
      get(attackMinAtom),
      get(attackMaxAtom),
    ),
    calculateMaterialsRange(
      get(talentMatsAtom),
      get(skillMinAtom),
      get(skillMaxAtom),
    ),
    calculateMaterialsRange(
      get(talentMatsAtom),
      get(burstMinAtom),
      get(burstMaxAtom),
    ),
  ),
);

const calculatedMaterialsAtom = atom((get) => {
  const characterMaterials = get(characterMaterialsAtom);
  const materialNameToInfo = get(materialNameToInfoAtom);

  return Object.entries(
    mergeMaterials(get(characterMaterialsAtom), get(talentMaterialsAtom)),
  ).sort(([aName], [bName]) => {
    // give characterMaterials priority in sort
    const aIsCharMat = characterMaterials[aName] !== undefined;
    const bIsCharMat = characterMaterials[bName] !== undefined;

    if (aIsCharMat === bIsCharMat) {
      const aSortorder = materialNameToInfo[aName]!.sortorder;
      const bSortorder = materialNameToInfo[bName]!.sortorder;

      if (aSortorder === bSortorder) {
        const aRarity = materialNameToInfo[aName]!.rarity;
        const bRarity = materialNameToInfo[bName]!.rarity;

        return sortStringAsNumber(aRarity, bRarity);
      } else {
        return aSortorder - bSortorder;
      }
    } else if (aIsCharMat) {
      return -1; // sort a before b
    } else {
      return 1; // sort b before a
    }
  });
});

function calculateMaterialsRange(
  costs: Item[][],
  start: number, // min is 0
  end: number, // max is len of array (not max index)
) {
  const materials: Record<string, number> = {};

  if (start < end) {
    for (const value of costs.slice(start + 1, end + 1)) {
      for (const { name, count } of value) {
        if (count > 0) {
          if (materials.hasOwnProperty(name)) {
            materials[name] += count;
          } else {
            materials[name] = count;
          }
        }
      }
    }
  }

  return materials;
}

function mergeMaterials(...materials: Record<string, number>[]) {
  const merged: Record<string, number> = {};

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
}

// STATE TEMPLATE SETTERS
const setNoLevelsAtom = atom(null, (_get, set) => {
  set(levelMinAtom, 0);
  set(levelMaxAtom, 0);
  set(attackMinAtom, 0);
  set(attackMaxAtom, 0);
  set(skillMinAtom, 0);
  set(skillMaxAtom, 0);
  set(burstMinAtom, 0);
  set(burstMaxAtom, 0);
});

const setRecommendedLevelsAtom = atom(null, (get, set) => {
  set(levelMaxAtom, Math.max(get(levelOptionsAtom).length - 2, 0)); // 80+
  set(attackMaxAtom, Math.max(get(talentOptionsAtom).length - 3, 0)); // 8
  set(skillMaxAtom, Math.max(get(talentOptionsAtom).length - 3, 0)); // 8
  set(burstMaxAtom, Math.max(get(talentOptionsAtom).length - 3, 0)); // 8
});

const setMaxLevelsAtom = atom(null, (get, set) => {
  set(levelMaxAtom, Math.max(get(levelOptionsAtom).length - 1, 0));
  set(attackMaxAtom, Math.max(get(talentOptionsAtom).length - 1, 0));
  set(skillMaxAtom, Math.max(get(talentOptionsAtom).length - 1, 0));
  set(burstMaxAtom, Math.max(get(talentOptionsAtom).length - 1, 0));
});

// HOOK FUNCTIONS
export function useMaterialNameToInfo() {
  return useAtomValue(materialNameToInfoAtom);
}

export function useLevelOptions() {
  return useAtomValue(levelOptionsAtom);
}

export function useLevelMin() {
  return useAtom(levelMinAtom);
}

export function useLevelMax() {
  return useAtom(levelMaxAtom);
}

export function useTalentOptions() {
  return useAtomValue(talentOptionsAtom);
}

export function useAttackMin() {
  return useAtom(attackMinAtom);
}

export function useAttackMax() {
  return useAtom(attackMaxAtom);
}

export function useSkillMin() {
  return useAtom(skillMinAtom);
}

export function useSkillMax() {
  return useAtom(skillMaxAtom);
}

export function useBurstMin() {
  return useAtom(burstMinAtom);
}

export function useBurstMax() {
  return useAtom(burstMaxAtom);
}

export function useCalculatedMaterials() {
  return useAtomValue(calculatedMaterialsAtom);
}

export function useSetNoLevels() {
  return useSetAtom(setNoLevelsAtom);
}

export function useSetRecommendedLevels() {
  return useSetAtom(setRecommendedLevelsAtom);
}

export function useSetMaxLevels() {
  return useSetAtom(setMaxLevelsAtom);
}
