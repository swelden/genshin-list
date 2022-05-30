import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import useMinMax from "../../hooks/useMinMax";
import { MaterialInfo } from "../../pages/[name]";
import MaterialList, {
  calculateMaterialsRange,
  Materials,
  mergeMaterials,
} from "../MaterialList";
import Section from "./Section";

export type MaterialList = [string, number][];
const MaterialCalculatorSection: React.FC<{ materials: MaterialInfo }> = ({
  materials,
}) => {
  const [totalMaterials, setTotalMaterials] = useState<MaterialList>([]);
  const [characterMaterials, setCharacterMaterials] = useState<Materials>({});
  const [talentMaterials, setTalentMaterials] = useState<Materials>({});

  const daysofweek: string = useMemo(() => {
    for (const material of Object.values(materials.materialData)) {
      if (material.daysofweek) {
        return material.daysofweek.join(", ");
      }
    }

    return "";
  }, [materials.materialData]);

  useEffect(() => {
    const totalMats = Object.entries(
      mergeMaterials(characterMaterials, talentMaterials)
    ).sort(([aName], [bName]) => {
      const aIsCharMat = characterMaterials[aName] !== undefined;
      const bIsCharMat = characterMaterials[bName] !== undefined;

      if (aIsCharMat === bIsCharMat) {
        return (
          materials.materialData[aName].sortorder -
          materials.materialData[bName].sortorder
        );
      } else if (aIsCharMat) {
        return -1; // sort a before b
      } else {
        return 1; // sort b before a
      }
    });

    setTotalMaterials(totalMats);
  }, [materials.materialData, characterMaterials, talentMaterials]);

  // console.log(materials);

  return (
    <Section title="Material Calculator">
      <div className="grid gap-6 xl:grid-cols-[345px,_auto]">
        <MaterialCalculator
          levelCosts={materials.characterCosts}
          setCharacterMaterials={setCharacterMaterials}
          talentCosts={materials.talentCosts}
          setTalentMaterials={setTalentMaterials}
        />
        <div>
          <div className="mb-2">
            <span>
              Talents: {/*comment is to leave space*/}
              <span className="text-black/80 dark:text-white/80">
                {daysofweek}
              </span>
            </span>
          </div>
          <MaterialList
            totalMaterials={totalMaterials}
            materialData={materials.materialData}
          />
        </div>
      </div>
    </Section>
  );
};

const MaterialCalculator: React.FC<{
  levelCosts: MaterialInfo["characterCosts"];
  setCharacterMaterials: Dispatch<SetStateAction<Materials>>;
  talentCosts: MaterialInfo["talentCosts"];
  setTalentMaterials: Dispatch<SetStateAction<Materials>>;
}> = ({
  levelCosts,
  setCharacterMaterials,
  talentCosts,
  setTalentMaterials,
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <LevelCalculator
        levelCosts={levelCosts}
        setCharacterMaterials={setCharacterMaterials}
      />
      <TalentCalculator
        talentCosts={talentCosts}
        setTalentMaterials={setTalentMaterials}
      />
    </div>
  );
};

const LevelCalculator: React.FC<{
  levelCosts: MaterialInfo["characterCosts"];
  setCharacterMaterials: Dispatch<SetStateAction<Materials>>;
}> = ({ levelCosts, setCharacterMaterials }) => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(Object.keys(levelCosts).length - 1);

  const [levelKeys, levelMats] = useMemo(() => {
    const levelKeys = Object.keys(levelCosts).sort();
    const levelMats = levelKeys.map((key) => levelCosts[key]);
    return [levelKeys, levelMats];
  }, [levelCosts]);

  useEffect(() => {
    min >= max
      ? setCharacterMaterials({})
      : setCharacterMaterials(
          calculateMaterialsRange(levelMats, min + 1, max + 1)
        );
  }, [setCharacterMaterials, levelMats, min, max]);

  return (
    <>
      <LevelSelector
        label="Current Level"
        levelKeys={levelKeys}
        currentValue={min}
        setValue={setMin}
      />
      <LevelSelector
        label="Intended Level"
        levelKeys={levelKeys}
        currentValue={max}
        setValue={setMax}
      />
    </>
  );
};

const LevelSelector: React.FC<{
  label: string;
  levelKeys: string[];
  currentValue: number;
  setValue: Dispatch<SetStateAction<number>>;
}> = ({ label, levelKeys, currentValue, setValue }) => {
  return (
    <div className="w-full">
      <h3 className="mb-2">{label}</h3>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(40px,_1fr))] gap-2 sm:grid-cols-7 md:grid-cols-14 xl:grid-cols-7">
        {levelKeys.map((lvl, index) => (
          <button
            className={`h-10 rounded-2xl border-2 text-sm ${
              index === currentValue
                ? "bg-gray-700"
                : "border-gray-400 text-gray-400"
            }`}
            onClick={() => setValue(index)}
            key={lvl}
          >
            {lvl}
          </button>
        ))}
      </div>
    </div>
  );
};

const TalentCalculator: React.FC<{
  talentCosts: MaterialInfo["talentCosts"];
  setTalentMaterials: Dispatch<SetStateAction<Materials>>;
}> = ({ talentCosts, setTalentMaterials }) => {
  const [levelKeys, levelMats] = useMemo(() => {
    const levelKeys = Object.keys(talentCosts).sort(
      (a, b) => parseInt(a) - parseInt(b)
    );
    const levelMats = levelKeys.map((key) => talentCosts[key]);
    return [levelKeys, levelMats];
  }, [talentCosts]);

  const [attackMin, setAttackMin, attackMax, setAttackMax, attackMaterials] =
    useMinMax(0, levelKeys.length - 1, levelMats);
  const [skillMin, setSkillMin, skillMax, setSkillMax, skillMaterials] =
    useMinMax(0, levelKeys.length - 1, levelMats);
  const [burstMin, setBurstMin, burstMax, setBurstMax, burstMaterials] =
    useMinMax(0, levelKeys.length - 1, levelMats);

  useEffect(() => {
    setTalentMaterials(
      mergeMaterials(attackMaterials, skillMaterials, burstMaterials)
    );
  }, [setTalentMaterials, attackMaterials, burstMaterials, skillMaterials]);

  return (
    <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-1">
      <span className="text-center">Attack</span>
      <span className="text-center">Skill</span>
      <span className="text-center">Burst</span>
      <TalentSelectorDropdown
        values={levelKeys}
        value={attackMin}
        setValue={setAttackMin}
      />
      <TalentSelectorDropdown
        values={levelKeys}
        value={skillMin}
        setValue={setSkillMin}
      />
      <TalentSelectorDropdown
        values={levelKeys}
        value={burstMin}
        setValue={setBurstMin}
      />
      <span className="col-span-3 my-1 text-center text-sm">to level</span>
      <TalentSelectorDropdown
        values={levelKeys}
        value={attackMax}
        setValue={setAttackMax}
      />
      <TalentSelectorDropdown
        values={levelKeys}
        value={skillMax}
        setValue={setSkillMax}
      />
      <TalentSelectorDropdown
        values={levelKeys}
        value={burstMax}
        setValue={setBurstMax}
      />
    </div>
  );
};

const TalentSelectorDropdown: React.FC<{
  values: string[];
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}> = ({ values, value, setValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Math.trunc(parseInt(event.target.value));
    newValue <= 10 && newValue >= 1 ? setValue(newValue - 1) : setValue(0);
  };

  return (
    <select
      className="h-9 cursor-pointer appearance-none rounded-2xl border-2 border-transparent bg-zinc-200 text-center duration-100 ease-in focus-within:border-zinc-500 dark:bg-zinc-900"
      onChange={handleChange}
      value={values[value]}
    >
      {values.map((label) => (
        <option value={label} key={label}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default MaterialCalculatorSection;
