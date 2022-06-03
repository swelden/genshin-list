import { Dispatch, SetStateAction, useMemo } from "react";
import { useMaterialContext } from "../../contexts/MaterialContext";
import { MaterialDataMap } from "../../pages/[name]";
import { RightArrowIcon } from "../icons";
import MaterialList, { mergeMaterials } from "../MaterialList";
import { SelectMenu, SelectOption } from "../SelectMenu";
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
    <div className="flex w-full flex-col gap-3">
      <LevelCalculator />
      <TalentCalculator />
    </div>
  );
};

const RangeSelector: React.FC<{
  title: string;
  min: number;
  max: number;
  setMin: Dispatch<SetStateAction<number>>;
  setMax: Dispatch<SetStateAction<number>>;
  options: SelectOption<number>[];
}> = ({ title, min, max, setMin, setMax, options }) => {
  return (
    <div className="w-full">
      <h3 className="mb-1">{title}</h3>
      <div className="grid grid-cols-[1fr_24px_1fr] items-center justify-center gap-2">
        <SelectMenu
          options={options}
          currentValue={options[min]}
          handleChange={setMin}
        />
        <div className="flex w-full items-center justify-center text-gray-600">
          <RightArrowIcon />
        </div>
        <SelectMenu
          options={options}
          currentValue={options[max]}
          handleChange={setMax}
        />
      </div>
    </div>
  );
};

const LevelCalculator: React.FC<{}> = () => {
  const { levelMin, setLevelMin, levelMax, setLevelMax, levelOptions } =
    useMaterialContext()!;

  return (
    <RangeSelector
      title="Level"
      min={levelMin}
      max={levelMax}
      setMin={setLevelMin}
      setMax={setLevelMax}
      options={levelOptions}
    />
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
    talentOptions,
  } = useMaterialContext()!;

  return (
    <>
      <RangeSelector
        title="Attack"
        min={attackMin}
        max={attackMax}
        setMin={setAttackMin}
        setMax={setAttackMax}
        options={talentOptions}
      />
      <RangeSelector
        title="Skill"
        min={skillMin}
        max={skillMax}
        setMin={setSkillMin}
        setMax={setSkillMax}
        options={talentOptions}
      />
      <RangeSelector
        title="Burst"
        min={burstMin}
        max={burstMax}
        setMin={setBurstMin}
        setMax={setBurstMax}
        options={talentOptions}
      />
    </>
  );
};

export default MaterialCalculatorSection;
