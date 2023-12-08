import type { Character } from "@/data/types";
import { Section, SectionHeader } from "@/components/ui/section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface AttributeSectionProps {
  character: Character;
}

export function AttributeSection({ character }: AttributeSectionProps) {
  return (
    <Section className="w-full lg:bg-section/80 lg:p-3 lg:backdrop-blur-lg">
      <SectionHeader>Attributes</SectionHeader>
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
