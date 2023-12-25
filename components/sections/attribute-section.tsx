import type { Character } from "@/data/types";
import { cn } from "@/lib/utils";
import {
  Section,
  SectionContent,
  SectionHeader,
} from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface AttributeSectionProps {
  character: Character;
  className?: string;
}

export function AttributeSection({
  character,
  className,
}: AttributeSectionProps) {
  return (
    <Section className={cn("overflow-hidden", className)}>
      <SectionHeader>Attributes</SectionHeader>
      <Separator className="my-4" invert />
      <SectionContent>
        <Table className="text-base">
          <TableBody>
            <AttrRow title="Birthday" info={character.birthday} />
            <AttrRow title="Constellation" info={character.constellation} />
            <AttrRow title="Title" info={character.title} />
            <AttrRow title="Region" info={character.region} />
            {/* <AttrRow title="Element" info={character.element} /> */}
            <AttrRow title="Affiliation" info={character.affiliation} />
            <AttrRow title="English VA" info={character.va.english} />
            <AttrRow title="Version" info={character.version} />
          </TableBody>
        </Table>
      </SectionContent>
    </Section>
  );
}

interface AttrRowProps {
  title: string;
  info: string;
}

function AttrRow({ title, info }: AttrRowProps) {
  return (
    <TableRow>
      <TableHead scope="row">{title}</TableHead>
      <TableCell className="text-right">{info}</TableCell>
    </TableRow>
  );
}
