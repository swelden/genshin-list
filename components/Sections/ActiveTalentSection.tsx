import Image from "next/image";
import { Props } from "../../pages/[name]";
import { imageUrl } from "../../utils/urls";
import Section from "./Section";

// TODO: make separate passive talent section
const ActiveTalentSection: React.FC<Pick<Props, "talents">> = ({ talents }) => {
  console.log(talents);
  return (
    <Section title="Active Talents">
      {talents.actives.map((activeTalent) => (
        <div
          className="border-b border-neutral-500/20 pb-4 last:border-0 last:pb-0 "
          key={activeTalent.name}
        >
          <div className="flex items-center gap-2">
            <Image
              src={imageUrl(activeTalent.icon)} // gacha-splash
              alt={`${activeTalent.name} gacha splash`}
              width={48}
              height={48}
              className="invert dark:filter-none"
            />
            <h3 className="text-lg">{activeTalent.name}</h3>
          </div>
          <div
            className="mt-2 text-black/70 dark:text-white/70"
            dangerouslySetInnerHTML={{
              __html: activeTalent.info,
            }}
          />
          {activeTalent.description && (
            <>
              <br />
              <i className="text-black/60 dark:text-white/60">
                {activeTalent.description}
              </i>
            </>
          )}
        </div>
      ))}
    </Section>
  );
};

export default ActiveTalentSection;
