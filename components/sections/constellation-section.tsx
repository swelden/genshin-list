import { ConstellationInfo } from "@/backend/name_page";
import Section from "@/components/sections/section";
import SectionRow from "@/components/sections/section-row";

const ConstellationSection: React.FC<{
  constellations: ConstellationInfo[];
}> = ({ constellations }) => {
  // console.log(constellations);

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
