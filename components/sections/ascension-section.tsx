import type { Character } from "@/data/types";
import {
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { StatsTable } from "@/components/stats-table";

interface AscensionSectionProps {
  stats: Character["stats"];
}

export function AscensionSection({ stats }: AscensionSectionProps) {
  return (
    <Section className="overflow-hidden">
      <SectionHeader>Ascensions</SectionHeader>
      <Separator className="my-4" invert />
      <SectionContent>
        <StatsTable data={stats.data} topHeadings={stats.headings} />
      </SectionContent>
    </Section>
  );
}
