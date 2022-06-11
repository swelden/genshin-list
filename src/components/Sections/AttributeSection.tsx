import { CharacterInfo } from "../../pages/[name]";
import Section from "./Section";

const AttributeSection: React.FC<{ character: CharacterInfo }> = ({
  character,
}) => {
  return (
    <Section
      title="Attributes"
      lgPadding="lg:p-3"
      className="lg:bg-opacity-90 lg:backdrop-blur-sm lg:dark:bg-opacity-95"
    >
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

const AttrRow: React.FC<{ title: string; info: string }> = ({
  title,
  info,
}) => {
  return (
    <tr className="border-b border-neutral-500/20 odd:bg-zinc-300/20 dark:odd:bg-zinc-600/10">
      <th
        className="py-3 px-2 text-left font-normal text-black/60 dark:text-white/60"
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

export default AttributeSection;
