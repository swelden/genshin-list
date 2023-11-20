"use client";

import { MaterialInfo } from "@/backend/name_page";
import MaterialProvider, {
  useMaterialContext,
} from "@/contexts/material-context";
import { Dispatch, SetStateAction, useMemo } from "react";

import { RightArrowIcon } from "@/components/icons";
import MaterialList from "@/components/material-list";
import Section from "@/components/sections/section";
import { SelectMenu, SelectOption } from "@/components/select-menu";

const MaterialCalculatorSection: React.FC<{
  materials: MaterialInfo;
}> = ({ materials: { characterCosts, talentCosts, materialData } }) => {
  const daysofweek: string = useMemo(() => {
    for (const material of Object.values(materialData)) {
      if (material.daysofweek) {
        return material.daysofweek.join(", ");
      }
    }

    return "";
  }, [materialData]);

  return (
    <MaterialProvider levelCosts={characterCosts} talentCosts={talentCosts}>
      <Section title="Material Calculator">
        <div className="grid gap-6 xl:grid-cols-[20rem,_auto]">
          <MaterialCalculator />
          {/* NOTE: might put "Required Materials" in center and move daysofweek */}
          <div>
            <div className="mb-4 text-center xl:mb-1 xl:text-left">
              <span className="">
                Talents: {/*comment is to leave space*/}
                <span className="text-black/80 dark:text-white/80">
                  {daysofweek}
                </span>
              </span>
            </div>
            <MaterialList materialData={materialData} />
          </div>
        </div>
      </Section>
    </MaterialProvider>
  );
};

const MaterialCalculator: React.FC<{}> = ({}) => {
  return (
    <div className="flex w-full flex-col gap-4 lg:px-11 xl:px-0">
      <LevelCalculator />
      <TalentCalculator />
      <LevelTemplateSelector />
    </div>
  );
};

const LevelTemplateSelector = () => {
  const { setNoLevels, setMaxLevels } = useMaterialContext()!;

  return (
    <div className="mt-2 grid grid-cols-2 gap-3">
      <button
        className="key-focus key-focus-section rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 dark:bg-zinc-900 hover:dark:bg-black/60"
        onClick={setNoLevels}
      >
        Clear
      </button>
      <button
        className="key-focus key-focus-section rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 dark:bg-zinc-900 hover:dark:bg-black/60"
        onClick={setMaxLevels}
      >
        Max
      </button>
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
