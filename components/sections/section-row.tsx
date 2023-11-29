import { IconImage } from "@/components/ui/icon-image";
import { TalentInfo } from "@/lib/get-character-details";
import { formatImageUrl } from "@/lib/utils";

type Passives = TalentInfo["passives"][number];
interface Ability extends Passives {
  description?: string;
}

interface SectionRowProps {
  ability: Ability;
  children?: React.ReactNode;
  isAbsoluteIconPath?: boolean;
}

export const SectionRow = ({
  ability,
  children,
  isAbsoluteIconPath = false,
}: SectionRowProps) => {
  return (
    <div className="border-b pb-4 last:border-0 last:pb-0" key={ability.name}>
      <div className="flex items-center gap-2">
        <IconImage
          // NOTE: do not retrieve images from "mihoyo.com" (it sends cookies)
          src={isAbsoluteIconPath ? ability.icon : formatImageUrl(ability.icon)}
          alt={ability.name}
          className="h-12 w-12"
          invert={true}
        />
        <h3 className="text-lg">{ability.name}</h3>
      </div>
      <div
        className="text-section-foreground/75 mt-2"
        dangerouslySetInnerHTML={{
          __html: ability.info,
        }}
      />
      {ability?.description && (
        <>
          <br />
          <i className="text-section-foreground/60">{ability.description}</i>
        </>
      )}
      {children}
    </div>
  );
};
SectionRow.displayName = "SectionRow";
