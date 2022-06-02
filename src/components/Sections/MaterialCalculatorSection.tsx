import { Dispatch, SetStateAction, useMemo } from "react";
import { useMaterialContext } from "../../contexts/MaterialContext";
import { MaterialDataMap } from "../../pages/[name]";
import MaterialList, { mergeMaterials } from "../MaterialList";
import { SelectMenu } from "../SelectMenu";
import Section from "./Section";

export type MaterialList = [string, number][];

const MaterialCalculatorSection: React.FC<{
  materialData: MaterialDataMap;
}> = ({ materialData }) => {
  const { characterMaterials, talentMaterials } = useMaterialContext()!;

  const daysofweek: string = useMemo(() => {
    for (const material of Object.values(materialData)) {
      if (material.daysofweek) {
        return material.daysofweek.join(", ");
      }
    }

    return "";
  }, [materialData]);

  // NOTE: shouldn't need to use useMemo
  const totalMaterials: MaterialList = Object.entries(
    mergeMaterials(characterMaterials, talentMaterials)
  ).sort(([aName], [bName]) => {
    const aIsCharMat = characterMaterials[aName] !== undefined;
    const bIsCharMat = characterMaterials[bName] !== undefined;

    if (aIsCharMat === bIsCharMat) {
      return materialData[aName].sortorder - materialData[bName].sortorder;
    } else if (aIsCharMat) {
      return -1; // sort a before b
    } else {
      return 1; // sort b before a
    }
  });

  // console.log("CALC RENDER");

  return (
    <Section title="Material Calculator">
      <div className="grid gap-6 xl:grid-cols-[345px,_auto]">
        <MaterialCalculator />
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
            materialData={materialData}
          />
        </div>
      </div>
    </Section>
  );
};

const MaterialCalculator: React.FC<{}> = ({}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <LevelCalculator />
      <TalentCalculator />
    </div>
  );
};

const LevelCalculator: React.FC<{}> = () => {
  const { levelMin, setLevelMin, levelMax, setLevelMax } =
    useMaterialContext()!;

  return (
    <>
      <LevelSelector
        label="Current Level"
        currentValue={levelMin}
        setValue={setLevelMin}
      />
      <LevelSelector
        label="Intended Level"
        currentValue={levelMax}
        setValue={setLevelMax}
      />
    </>
  );
};

// TODO: use SelectMenu
const LevelSelector: React.FC<{
  label: string;
  currentValue: number;
  setValue: Dispatch<SetStateAction<number>>;
}> = ({ label, currentValue, setValue }) => {
  const { levelOptions } = useMaterialContext();

  return (
    <div className="w-full">
      <h3 className="mb-2">{label}</h3>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(40px,_1fr))] gap-2 sm:grid-cols-7 md:grid-cols-14 xl:grid-cols-7">
        {levelOptions.map(({ label, value }, index) => (
          <button
            className={`h-10 rounded-2xl border-2 text-sm ${
              index === currentValue
                ? "bg-gray-700"
                : "border-gray-400 text-gray-400"
            }`}
            onClick={() => setValue(value)}
            key={label}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

const TalentCalculator: React.FC<{}> = () => {
  const {
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
  } = useMaterialContext()!;

  return (
    <div className="mt-3 grid grid-cols-3 gap-x-2 gap-y-1">
      <span className="text-center">Attack</span>
      <span className="text-center">Skill</span>
      <span className="text-center">Burst</span>
      <TalentSelectorDropdown value={attackMin} setValue={setAttackMin} />
      <TalentSelectorDropdown value={skillMin} setValue={setSkillMin} />
      <TalentSelectorDropdown value={burstMin} setValue={setBurstMin} />
      <span className="col-span-3 my-1 text-center text-sm">to level</span>
      <TalentSelectorDropdown value={attackMax} setValue={setAttackMax} />
      <TalentSelectorDropdown value={skillMax} setValue={setSkillMax} />
      <TalentSelectorDropdown value={burstMax} setValue={setBurstMax} />
    </div>
  );
};

const TalentSelectorDropdown: React.FC<{
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}> = ({ value, setValue }) => {
  const { talentOptions } = useMaterialContext();

  return (
    <SelectMenu
      options={talentOptions}
      currentValue={talentOptions[value]}
      handleChange={setValue}
    />
  );
};

export default MaterialCalculatorSection;
