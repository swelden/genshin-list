import Image from "next/image";
import { Props } from "../../pages/[name]";
import { imageUrl } from "../../utils/urls";
import Section from "./Section";

const PassiveTalentSection: React.FC<{
  passives: Pick<Props, "talents">["talents"]["passives"];
}> = ({ passives }) => {
  console.log(passives);
  return (
    <Section title="Passive Talents">
      {passives.map((passiveTalent) => (
        <div
          className="border-b border-neutral-500/20 pb-4 last:border-0 last:pb-0 "
          key={passiveTalent.name}
        >
          <div className="flex items-center gap-2">
            <Image
              src={imageUrl(passiveTalent.icon)} // gacha-splash
              alt={`${passiveTalent.name} gacha splash`}
              width={48}
              height={48}
              className="invert dark:filter-none"
            />
            <h3 className="text-lg">{passiveTalent.name}</h3>
          </div>
          <div
            className="mt-2 text-black/70 dark:text-white/70"
            dangerouslySetInnerHTML={{
              __html: passiveTalent.info,
            }}
          />
        </div>
      ))}
    </Section>
  );
};

export default PassiveTalentSection;
