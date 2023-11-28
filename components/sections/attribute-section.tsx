import { Section, SectionHeader } from "@/components/ui/section";
import { CharacterInfo } from "@/lib/get-character-details";

export const AttributeSection = ({
  character,
}: {
  character: CharacterInfo;
}) => {
  return (
    <Section className="lg:bg-opacity-90 lg:p-3 lg:backdrop-blur-sm lg:dark:bg-opacity-95">
      <SectionHeader>Attributes</SectionHeader>
      <table className="w-full">
        <tbody className="">
          <AttrRow title="Birthday" info={character.birthdaymmdd} />
          <AttrRow title="Constellation" info={character.constellation} />
          <AttrRow title="Title" info={character.title} />
          <AttrRow title="Region" info={character.region} />
          {/* <AttrRow title="Vision" info={character.element} /> */}
          <AttrRow title="Affiliation" info={character.affiliation} />
          <AttrRow title="English VA" info={character.cv.english} />
        </tbody>
      </table>
      <div className="px-2 text-black/90 dark:text-white/90">
        {character.description}
      </div>
    </Section>
  );
};
AttributeSection.displayName = "AttributeSection";

const AttrRow = ({ title, info }: { title: string; info: string }) => {
  return (
    <tr className="border-b border-neutral-500/20 odd:bg-zinc-300/20 dark:odd:bg-zinc-600/10">
      <th
        className="px-2 py-3 text-left font-normal text-black/60 dark:text-white/60"
        scope="row"
      >
        {title}
      </th>
      <td className="px-2 text-right text-black/90 dark:text-white/90">
        {info}
      </td>
    </tr>
  );
};
AttrRow.displayName = "AttrRow";
