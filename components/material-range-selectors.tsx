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
import type { SelectOption } from "@/components/ui/select";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Icons } from "@/components/icons";

export function LevelRangeSelector() {
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

export function AttackRangeSelector() {
  const talentOptions = useTalentOptions();
  const [attackMin, setAttackMin] = useAttackMin();
  const [attackMax, setAttackMax] = useAttackMax();

  return (
    <RangeSelector
      title="Attack"
      min={attackMin}
      max={attackMax}
      setMin={setAttackMin}
      setMax={setAttackMax}
      options={talentOptions}
    />
  );
}

export function SkillRangeSelector() {
  const talentOptions = useTalentOptions();
  const [skillMin, setSkillMin] = useSkillMin();
  const [skillMax, setSkillMax] = useSkillMax();

  return (
    <RangeSelector
      title="Skill"
      min={skillMin}
      max={skillMax}
      setMin={setSkillMin}
      setMax={setSkillMax}
      options={talentOptions}
    />
  );
}

export function BurstRangeSelector() {
  const talentOptions = useTalentOptions();
  const [burstMin, setBurstMin] = useBurstMin();
  const [burstMax, setBurstMax] = useBurstMax();

  return (
    <RangeSelector
      title="Burst"
      min={burstMin}
      max={burstMax}
      setMin={setBurstMin}
      setMax={setBurstMax}
      options={talentOptions}
    />
  );
}

export function RangeTemplateSelector() {
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
  min: SelectOption<number>;
  max: SelectOption<number>;
  setMin: React.Dispatch<React.SetStateAction<SelectOption<number>>>;
  setMax: React.Dispatch<React.SetStateAction<SelectOption<number>>>;
  options: SelectOption<number>[];
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
          <Icons.rightarrow className="size-6 min-w-6" />
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
  curValue: SelectOption<number>;
  setValue: React.Dispatch<React.SetStateAction<SelectOption<number>>>;
  options: SelectOption<number>[];
  className?: string;
}

function CalculatorDropdown({
  curValue,
  setValue,
  options,
  className,
}: CalculatorDropdownProps) {
  return (
    <Select
      items={options}
      selectedItem={curValue}
      setSelectedItem={setValue}
      className={className}
      size="small"
      scrollable
    >
      <SelectTrigger label="Select the level range">
        {curValue.label}
      </SelectTrigger>
    </Select>
  );
}
