"use client";

import * as React from "react";

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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  type DropdownOption,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";

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
      <Button onClick={setNoLevels} variant="secondary">
        Clear
      </Button>
      <Button onClick={setMaxLevels} variant="secondary">
        Max
      </Button>
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
        <CalculatorDropdown
          curValue={min}
          setValue={setMin}
          options={options}
        />
        <div className="flex w-full items-center justify-center text-gray-600">
          <Icons.rightarrow className="h-6 w-6 min-w-[1.5rem]" />
        </div>
        <CalculatorDropdown
          curValue={max}
          setValue={setMax}
          options={options}
        />
      </div>
    </div>
  );
}

interface CalculatorDropdownProps {
  curValue: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  options: DropdownOption<number>[];
  className?: string;
}

function CalculatorDropdown({
  curValue,
  setValue,
  options,
  className,
}: CalculatorDropdownProps) {
  const selectedOption = options[curValue]!;

  const handleChange = (event: DropdownOption<number>) => {
    setValue(event.value);
  };

  return (
    <DropdownMenu
      value={selectedOption}
      onChange={handleChange}
      className={className}
    >
      <DropdownMenuTrigger size="small">
        {selectedOption.label}
      </DropdownMenuTrigger>
      <DropdownMenuContent scrollable>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            value={option}
            size="small"
            innerClassName="py-1"
            checkClassName="h-5 w-5"
          >
            <span className="flex items-center">{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
