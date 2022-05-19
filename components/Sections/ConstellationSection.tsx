import Section from "./Section";
import { Props } from "../../pages/[name]";
import SectionRow from "./SectionRow";

const ConstellationSection: React.FC<Pick<Props, "constellations">> = ({
  constellations,
}) => {
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
