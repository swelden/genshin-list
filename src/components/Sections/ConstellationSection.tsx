import { ConstellationInfo } from "../../pages/[name]";
import Section from "./Section";
import SectionRow from "./SectionRow";

const ConstellationSection: React.FC<{
  constellations: ConstellationInfo[];
}> = ({ constellations }) => {
  console.log(constellations);
  return (
    <Section title="Constellations">
      {constellations.map((constellation, index) => (
        <SectionRow
          ability={constellation}
          isAbsoluteIconPath={true}
          key={`${index}-${constellation.name}`} // NOTE: Aloy has same constellation name for each constellation
        />
      ))}
    </Section>
  );
};

export default ConstellationSection;
