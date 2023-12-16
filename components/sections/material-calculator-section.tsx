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
        <div className="grid gap-6 xl:grid-cols-[20rem,_auto]">
          <MaterialCalculator />
          {/* NOTE: might put "Required Materials" in center and move daysofweek */}
          <div>
            <DaysOfWeek weekdays={weekdays} />
            <MaterialList />
          </div>
        </div>
      </Section>
    </MaterialProvider>
  );
}

function DaysOfWeek({ weekdays }: { weekdays: Weekday[] }) {
  // TODO: change Talents: weekday, weekday to => (S) M (T) W T [(F)] S
  //() => means talent avaiable that day - [] => means current day indicator
  return (
    <div className="mb-4 text-center xl:mb-1 xl:text-right">
      <span className="">
        Talents: {/*comment is to leave space*/}
        <span className="text-black/80 dark:text-white/80">
          {weekdays.join(", ")}
        </span>
      </span>
    </div>
  );
}
