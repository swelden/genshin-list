import Image from "next/image";
import { Props } from "../../pages/[name]";
import { imageUrl } from "../../utils/urls";

type Passives = Pick<Props, "talents">["talents"]["passives"][number];
interface Ability extends Passives {
  description?: string;
}

interface SectionRowProps {
  ability: Ability;
  children?: React.ReactNode;
  isAbsoluteIconPath?: boolean;
}

const SectionRow: React.FC<SectionRowProps> = ({
  ability,
  children,
  isAbsoluteIconPath = false,
}) => {
  return (
    <div
      className="border-b border-neutral-500/20 pb-4 last:border-0 last:pb-0 "
      key={ability.name}
    >
      <div className="flex items-center gap-2">
        <Image
          src={isAbsoluteIconPath ? ability.icon : imageUrl(ability.icon)}
          alt={`${ability.name} icon`}
          width={48}
          height={48}
          className="invert dark:filter-none"
        />
        <h3 className="text-lg">{ability.name}</h3>
      </div>
      <div
        className="mt-2 text-black/70 dark:text-white/70"
        dangerouslySetInnerHTML={{
          __html: ability.info,
        }}
      />
      {ability?.description && (
        <>
          <br />
          <i className="text-black/60 dark:text-white/60">
            {ability.description}
          </i>
        </>
      )}
      {children}
    </div>
  );
};

export default SectionRow;
