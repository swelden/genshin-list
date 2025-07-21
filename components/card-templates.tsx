import Link from "next/link";

import type { CharacterFilter } from "@/data/types";
import { formatImageUrl, formatLongNumber, formatNameUrl } from "@/lib/utils";
import { Card, CardImage, CardLabel } from "@/components/ui/card";
import { IconImage } from "@/components/ui/icon-image";

interface CharacterCardProps {
  character: CharacterFilter;
  size: number;
}

export function CharacterCard({ character, size }: CharacterCardProps) {
  return (
    <Card hover="default" asChild>
      <Link href={formatNameUrl(character.name)}>
        <CardImage
          src={formatImageUrl(character.icon)}
          alt=""
          gradient={character.rarity === "5" ? "gold" : "purple"}
          width={size}
          height={size}
        >
          <div className="absolute top-0.5 left-0.5">
            <IconImage
              folder="/elements"
              src={character.element}
              alt={character.element}
              className="size-7.5"
            />
          </div>
        </CardImage>
        <CardLabel title={character.name}>{character.name}</CardLabel>
      </Link>
    </Card>
  );
}

interface ItemCardProps {
  label: string | number;
  src: string;
  alt: string;
  size: number;
  unoptimized?: boolean;
  shortenLongNumber?: boolean; // format long numbers => 7,050,900 => 7.05M
}

export function ItemCard({
  label,
  src,
  alt,
  size,
  unoptimized = true,
  shortenLongNumber = true,
}: ItemCardProps) {
  const formattedLabel =
    shortenLongNumber && typeof label === "number"
      ? formatLongNumber(label)
      : label;

  return (
    <Card>
      <CardImage
        src={src}
        alt={alt}
        gradient="default"
        width={size}
        height={size}
        unoptimized={unoptimized} // https://vercel.com/docs/image-optimization/limits-and-pricing
      />
      <CardLabel>{formattedLabel}</CardLabel>
    </Card>
  );
}
