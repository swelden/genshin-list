import { Props } from "../../pages/[name]";
import Section from "./Section";

// TODO: add stats
const AscensionSection: React.FC<
  Pick<Pick<Props, "character">["character"], "ascensions">
> = ({ ascensions }) => {
  console.log(ascensions);
  return (
    <Section title="Ascensions">
      <div>Ascensions</div>
    </Section>
  );
};

export default AscensionSection;
