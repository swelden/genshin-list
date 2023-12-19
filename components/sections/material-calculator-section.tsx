import type { Weekday } from "@/data/types";
import { Section, SectionHeader } from "@/components/ui/section";
import { MaterialCalculator } from "@/components/material-calculator";
import { MaterialList } from "@/components/material-list";
import { MaterialProvider } from "@/components/material-provider";

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
        <div className="grid gap-6 lg:grid-cols-[20rem,_auto]">
          <MaterialCalculator />
          <div className="flex flex-col">
            <DaysOfWeek weekdays={weekdays} />
            <MaterialList />
          </div>
        </div>
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
