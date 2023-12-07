import Link from "next/link";

import type { CharacterFilter } from "@/data/types";
import {
  formatImageUrl,
  formatLocalImageUrl,
  formatNameUrl,
} from "@/lib/utils";
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
          alt={character.name}
          gradient={character.rarity === "5" ? "gold" : "purple"}
          width={size}
          height={size}
        >
          <div className="absolute left-0.5 top-0.5">
            <IconImage
              src={formatLocalImageUrl("/elements", character.element)}
              alt={character.element}
              className="h-[1.875rem] w-[1.875rem]"
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
}

export function ItemCard({
  label,
  src,
  alt,
  size,
  unoptimized = true,
}: ItemCardProps) {
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
}
