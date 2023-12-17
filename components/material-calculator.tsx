"use client";

import {
  useAttackMax,
  useAttackMin,
  useBurstMax,
  useBurstMin,
  useLevelMax,
  useLevelMin,
  useLevelOptions,
  useSetMaxLevels,
  useSetNoLevels,
  useSkillMax,
  useSkillMin,
  useTalentOptions,
} from "@/hooks/use-materials";
import type { DropdownOption } from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { SelectMenu } from "@/components/select-menu";

export function MaterialCalculator() {
  return (
    <div className="flex w-full flex-col gap-4 lg:px-11 xl:px-0">
      <LevelCalculator />
      <TalentCalculator />
      <LevelTemplateSelector />
    </div>
  );
}

function LevelCalculator() {
  const levelOptions = useLevelOptions();
  const [levelMin, setLevelMin] = useLevelMin();
  const [levelMax, setLevelMax] = useLevelMax();

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
}

function TalentCalculator() {
  const talentOptions = useTalentOptions();
  const [attackMin, setAttackMin] = useAttackMin();
  const [attackMax, setAttackMax] = useAttackMax();
  const [skillMin, setSkillMin] = useSkillMin();
  const [skillMax, setSkillMax] = useSkillMax();
  const [burstMin, setBurstMin] = useBurstMin();
  const [burstMax, setBurstMax] = useBurstMax();

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
}

function LevelTemplateSelector() {
  const setNoLevels = useSetNoLevels();
  const setMaxLevels = useSetMaxLevels();

  return (
    <div className="mt-2 grid grid-cols-2 gap-3">
      <button
        className="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 dark:bg-zinc-900 hover:dark:bg-black/60"
        onClick={setNoLevels}
      >
        Clear
      </button>
      <button
        className="rounded-md bg-zinc-200 p-2 transition-colors hover:bg-zinc-300 dark:bg-zinc-900 hover:dark:bg-black/60"
        onClick={setMaxLevels}
      >
        Max
      </button>
    </div>
  );
}

interface RangeSelectorProps {
  title: string;
  min: number;
  max: number;
  setMin: React.Dispatch<React.SetStateAction<number>>;
  setMax: React.Dispatch<React.SetStateAction<number>>;
  options: DropdownOption<number>[];
}

function RangeSelector({
  title,
  min,
  max,
  setMin,
  setMax,
  options,
}: RangeSelectorProps) {
  return (
    <div className="w-full">
      <h3 className="mb-1">{title}</h3>
      <div className="grid grid-cols-[1fr_24px_1fr] items-center justify-center gap-2">
        <SelectMenu
          options={options}
          currentValue={options[min]!}
          handleChange={setMin}
        />
        <div className="flex w-full items-center justify-center text-gray-600">
          <Icons.rightarrow className="h-6 w-6 min-w-[1.5rem]" />
        </div>
        <SelectMenu
          options={options}
          currentValue={options[max]!}
          handleChange={setMax}
        />
      </div>
    </div>
  );
}
