import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Materials, mergeMaterials } from "../components/MaterialList";
import { SelectOption } from "../components/SelectMenu";
import useMinMax from "../hooks/useMinMax";
import { MaterialInfo } from "../pages/[name]";

interface MaterialContextType {
  // levels
  levelOptions: SelectOption<number>[];
  levelMin: number;
  setLevelMin: React.Dispatch<React.SetStateAction<number>>;
  levelMax: number;
  setLevelMax: React.Dispatch<React.SetStateAction<number>>;
  characterMaterials: Materials;

  // talents
  talentOptions: SelectOption<number>[];
  attackMin: number;
  setAttackMin: React.Dispatch<React.SetStateAction<number>>;
  attackMax: number;
  setAttackMax: React.Dispatch<React.SetStateAction<number>>;
  skillMin: number;
  setSkillMin: React.Dispatch<React.SetStateAction<number>>;
  skillMax: number;
  setSkillMax: React.Dispatch<React.SetStateAction<number>>;
  burstMin: number;
  setBurstMin: React.Dispatch<React.SetStateAction<number>>;
  burstMax: number;
  setBurstMax: React.Dispatch<React.SetStateAction<number>>;
  talentMaterials: Materials;

  // material level templates
  setNoLevels: () => void;
  setMaxLevels: () => void;
  // setRecommendedLevels: () => void;
}

// NOTE: can still cause an error if context is used outside of provider
export const MaterialContext = createContext<MaterialContextType>(
  {} as MaterialContextType
);

const MaterialProvider: React.FC<{
  levelCosts: MaterialInfo["characterCosts"];
  talentCosts: MaterialInfo["talentCosts"];
  children: React.ReactNode;
}> = ({ levelCosts, talentCosts, children }) => {
  // levels
  const [levelOptions, levelMats] = useMemo(() => {
    const levelKeys = Object.keys(levelCosts).sort();

    const levelOptions = levelKeys.map((key, idx) => {
      return { label: key, value: idx };
    });

    const levelMats = levelKeys.map((key) => levelCosts[key]);
    return [levelOptions, levelMats];
  }, [levelCosts]);

  const [levelMin, setLevelMin, levelMax, setLevelMax, characterMaterials] =
    useMinMax(0, levelOptions.length - 1, levelMats);

  // talents
  const [talentOptions, talentMats] = useMemo(() => {
    const talentKeys = Object.keys(talentCosts).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );

    const talentOptions = talentKeys.map((key, idx) => {
      return { label: key, value: idx };
    });

    const talentMats = talentKeys.map((key) => talentCosts[key]);
    return [talentOptions, talentMats];
  }, [talentCosts]);

  const [attackMin, setAttackMin, attackMax, setAttackMax, attackMaterials] =
    useMinMax(0, talentOptions.length - 1, talentMats);
  const [skillMin, setSkillMin, skillMax, setSkillMax, skillMaterials] =
    useMinMax(0, talentOptions.length - 1, talentMats);
  const [burstMin, setBurstMin, burstMax, setBurstMax, burstMaterials] =
    useMinMax(0, talentOptions.length - 1, talentMats);

  const talentMaterials = useMemo(
    () => mergeMaterials(attackMaterials, skillMaterials, burstMaterials),
    [attackMaterials, burstMaterials, skillMaterials]
  );

  const setNoLevels = useCallback(() => {
    setLevelMin(0);
    setLevelMax(0);
    setAttackMin(0);
    setAttackMax(0);
    setSkillMin(0);
    setSkillMax(0);
    setBurstMin(0);
    setBurstMax(0);
  }, [
    setLevelMin,
    setLevelMax,
    setAttackMin,
    setAttackMax,
    setSkillMin,
    setSkillMax,
    setBurstMin,
    setBurstMax,
  ]);

  const setMaxLevels = useCallback(() => {
    setLevelMax(levelOptions.length - 1);
    setAttackMax(talentOptions.length - 1);
    setSkillMax(talentOptions.length - 1);
    setBurstMax(talentOptions.length - 1);
  }, [
    setLevelMax,
    levelOptions.length,
    setAttackMax,
    setSkillMax,
    setBurstMax,
    talentOptions.length,
  ]);

  // const setRecommendedLevels = useCallback(() => {
  //   setLevelMax(levelOptions.length - 2); // 80+
  //   setAttackMax(talentOptions.length - 3); // 8
  //   setSkillMax(talentOptions.length - 3); // 8
  //   setBurstMax(talentOptions.length - 3); // 8
  // }, [
  //   setLevelMax,
  //   levelOptions.length,
  //   setAttackMax,
  //   setSkillMax,
  //   setBurstMax,
  //   talentOptions.length,
  // ]);

  return (
    <MaterialContext.Provider
      value={{
        levelOptions,
        levelMin,
        setLevelMin,
        levelMax,
        setLevelMax,
        characterMaterials,

        talentOptions,
        attackMin,
        setAttackMin,
        attackMax,
        setAttackMax,
        skillMin,
        setSkillMin,
        skillMax,
        setSkillMax,
        burstMin,
        setBurstMin,
        burstMax,
        setBurstMax,
        talentMaterials,

        setNoLevels,
        setMaxLevels,
        // setRecommendedLevels,
      }}
    >
      {children}
    </MaterialContext.Provider>
  );
};

export const useMaterialContext = () => useContext(MaterialContext);

export default MaterialProvider;
