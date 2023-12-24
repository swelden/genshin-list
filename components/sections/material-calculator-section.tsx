import type { Weekday } from "@/data/types";
import {
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { MaterialList } from "@/components/material-list";
import { MaterialProvider } from "@/components/material-provider";
import {
  AttackRangeSelector,
  BurstRangeSelector,
  LevelRangeSelector,
  RangeTemplateSelector,
  SkillRangeSelector,
} from "@/components/material-range-selectors";

interface MaterialCalculatorSectionProps {
  name: string;
  weekdays: Weekday[];
}

export function MaterialCalculatorSection({
  name,
  weekdays,
}: MaterialCalculatorSectionProps) {
  return (
    <MaterialProvider name={name}>
      <Section>
        <SectionHeader>Material Calculator</SectionHeader>
        <Separator className="my-4" invert />
        <SectionContent>
          <div className="grid gap-6 lg:grid-cols-[20rem,_auto]">
            <div className="flex w-full flex-col gap-4 md:px-11 lg:px-0">
              <LevelRangeSelector />
              <AttackRangeSelector />
              <SkillRangeSelector />
              <BurstRangeSelector />
              <RangeTemplateSelector />
            </div>
            <div className="flex flex-col">
              <DaysOfWeek weekdays={weekdays} />
              <MaterialList />
            </div>
          </div>
        </SectionContent>
      </Section>
    </MaterialProvider>
  );
}

function DaysOfWeek({ weekdays }: { weekdays: Weekday[] }) {
  return (
    <div className="mb-4 flex justify-center lg:mb-1 lg:justify-start">
      <span className="">
        Talents: {/*comment is to leave space*/}
        <span className="text-muted-foreground">{weekdays.join(", ")}</span>
      </span>
    </div>
  );
}
