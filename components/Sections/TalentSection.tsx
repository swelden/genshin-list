import { Props } from "../../pages/[name]";
import Section from "./Section";

const TalentSection: React.FC<Pick<Props, "talents">> = ({ talents }) => {
  console.log(talents);
  return (
    <Section title="Talents">
      <div>Talents</div>
    </Section>
  );
};

export default TalentSection;
