import Section from "./Section";
import Image from "next/image";
import { Props } from "../../pages/[name]";

const ConstellationSection: React.FC<Pick<Props, "constellations">> = ({
  constellations,
}) => {
  console.log(constellations);
  return (
    <Section title="Constellations">
      {constellations.map((constellation) => (
        <div
          className="border-b border-neutral-500/20 pb-4 last:border-0 last:pb-0"
          key={constellation.name}
        >
          <div className="flex items-center gap-2">
            <Image
              src={constellation.icon} // gacha-splash
              alt={`${constellation.name} gacha splash`}
              width={48}
              height={48}
              className="invert dark:filter-none"
            />
            <h3 className="text-lg">{constellation.name}</h3>
          </div>
          <div
            className="mt-2 text-black/60 dark:text-white/60"
            dangerouslySetInnerHTML={{
              __html: constellation.effect,
            }}
          />
        </div>
      ))}
    </Section>
  );
};

export default ConstellationSection;
