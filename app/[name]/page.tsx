import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

import { getCharacterNames } from "@/backend/requests";
import { getNamePageProps } from "@/data/retrieve";
import type { Character, CharacterRarity } from "@/data/types";
import {
  formatImageUrl,
  formatLocalImageUrl,
  formatNameUrl,
  unformatNameUrl,
} from "@/lib/utils";
import { IconImage } from "@/components/ui/icon-image";
import {
  ActiveTalentSection,
  AscensionSection,
  AttributeSection,
  ConstellationSection,
  MaterialCalculatorSection,
  PassiveTalentSection,
} from "@/components/sections";

export default function CharacterPage({ params: { name } }: PageProps) {
  const { character, talents, constellations } = getNamePageProps(
    unformatNameUrl(name),
  );

  return (
    <main className="relative flex flex-col gap-8 sm:overflow-hidden">
      <HeroSection character={character} />
      <div className="grid gap-8 sm:container">
        <AttributeSection character={character} className="lg:hidden" />
        <MaterialCalculatorSection
          name={character.name}
          weekdays={character.weekdays}
        />
        <AscensionSection stats={character.stats} />
        <ActiveTalentSection actives={talents.actives} />
        <PassiveTalentSection passives={talents.passives} />
        <ConstellationSection constellations={constellations} />
      </div>
    </main>
  );
}

interface HeroSectionProps {
  character: Character;
}

function HeroSection({ character }: HeroSectionProps) {
  return (
    <div className="sm:container md:grid">
      <div className="col-span-full row-span-full overflow-hidden sm:overflow-visible md:flex md:items-center md:justify-center">
        <div className="relative -left-1/4 -z-10 flex w-[150%] flex-col items-center justify-center md:left-0 md:w-full">
          <Image
            src={formatImageUrl(character.gachaSplash)}
            alt={character.name}
            width={1920}
            height={960}
            priority={true}
          />
          <div className="absolute bottom-0 z-0 h-24 w-full bg-gradient-to-t from-background" />
        </div>
      </div>
      <DetailHeader character={character} />
      <div className="col-span-full row-span-full row-start-2 ml-auto hidden max-w-md items-center justify-center gap-2 lg:flex">
        <AttributeSection
          character={character}
          className="bg-section/80 p-3 backdrop-blur-lg"
        />
      </div>
    </div>
  );
}

interface DetailHeaderProps {
  character: Character;
}

function DetailHeader({ character }: DetailHeaderProps) {
  return (
    <div className="col-span-full row-span-full flex items-center">
      <div className="flex flex-col gap-2 px-5 sm:px-4">
        <div className="flex w-fit items-center gap-2 rounded-lg md:bg-background/50 md:pr-3 md:backdrop-blur-md">
          <IconImage
            src={formatLocalImageUrl("/elements", character.element)}
            alt={character.element}
            className="h-[4.25rem] w-[4.25rem]"
          />
          <div className="flex flex-col py-5 sm:py-4">
            <h1 className="mb-1 text-3xl text-foreground md:text-2xl lg:text-3xl">
              {character.name}
            </h1>
            <StarRating rarity={character.rarity} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <CharacterBadge text={character.element} />
          <CharacterBadge text={character.weapon} />
          <CharacterBadge text={character.substat} />
          <CharacterBadge text={`${character.rarity}-star`} />
        </div>
        <div className="mt-4 rounded-lg text-base text-muted-foreground md:max-w-xs md:bg-background/50 md:px-2 md:py-1.5 md:text-sm md:backdrop-blur-lg lg:text-base">
          {character.description}
        </div>
      </div>
    </div>
  );
}

interface CharacterBadgeProps {
  text: string;
}

function CharacterBadge({ text }: CharacterBadgeProps) {
  return (
    <div className="rounded bg-zinc-300/50 px-2 py-1 text-xs dark:bg-zinc-700/70 md:backdrop-blur-sm">
      {text}
    </div>
  );
}

interface StarRatingProps {
  rarity: CharacterRarity;
}

function StarRating({ rarity }: StarRatingProps) {
  return (
    <div className="flex flex-nowrap gap-0.5">
      {[...Array(Number(rarity))].map((_, i) => (
        <IconImage
          key={`star-${i}`}
          src={formatLocalImageUrl("/", "star-rating")}
          alt="Star rating"
          className="h-[1.125rem] w-[1.125rem]"
        />
      ))}
    </div>
  );
}

// GENERATE PAGE DATA

type PageProps = { params: { name: string } };

export async function generateMetadata(
  { params: { name } }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { character } = getNamePageProps(name.replace(/-/g, " "));
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: character.name,
    description: `${character.name} is a playable ${character.rarity}-star ${character.element} ${character.weapon} character. ${character.description}`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const characters = getCharacterNames();

  const paths = characters.map((character) => ({
    name: formatNameUrl(character),
  }));

  return paths;
}
