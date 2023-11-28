import IconImage from "@/components/icon-image";
import { Card, CardImage, CardLabel } from "@/components/ui/card";
import { formatImageUrl, formatNameUrl } from "@/lib/utils";
import Link from "next/link";

export const CharacterCard = ({
  character,
  size,
}: {
  character: CharacterFilterInfo;
  size: number;
}) => {
  return (
    <Card hover="default" asChild>
      <Link href={formatNameUrl(character.name)}>
        <CardImage
          src={formatImageUrl(character.nameicon)}
          alt={character.name}
          gradient={character.rarity === "5" ? "gold" : "purple"}
          width={size}
          height={size}
        >
          <div className="absolute left-0.5 top-0.5">
            <IconImage
              src={`/element-icons/${character.element}-icon.png`}
              alt={character.element}
              className="h-[1.875rem] w-[1.875rem]"
            />
          </div>
        </CardImage>
        <CardLabel title={character.name}>{character.name}</CardLabel>
      </Link>
    </Card>
  );
};
CharacterCard.displayName = "CharacterCard";

interface ItemCardProps {
  label: string | number;
  src: string;
  alt: string;
  size: number;
  unoptimized?: boolean;
}

export const ItemCard = ({
  label,
  src,
  alt,
  size,
  unoptimized = true,
}: ItemCardProps) => {
  return (
    <Card>
      <CardImage
        src={src}
        alt={alt}
        gradient="default"
        width={size}
        height={size}
        unoptimized={unoptimized}
      />
      <CardLabel>{label}</CardLabel>
    </Card>
  );
};
ItemCard.displayName = "ItemCard";
