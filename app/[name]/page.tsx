import IconImage from "@/components/icon-image";
import {
  ActiveTalentSection,
  AscensionSection,
  AttributeSection,
  ConstellationSection,
  MaterialCalculatorSection,
  PassiveTalentSection,
} from "@/components/sections";
import {
  NamePageProps,
  getCharacterNames,
  getNamePageProps,
} from "@/lib/get-character-details";
import { formatImageUrl, formatNameUrl } from "@/lib/utils";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

type PageProps = { params: { name: string } };

export async function generateMetadata(
  { params: { name } }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { character } = getNamePageProps(name.replace(/-/g, " "));
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${character.name} - Genshin List`,
    description: `${character.name} is a playable ${character.rarity}-star ${character.element} ${character.weapontype} character. ${character.description}`,
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default function CharacterPage({ params: { name } }: PageProps) {
  const { character, materials, talents, constellations } = getNamePageProps(
    name.replace(/-/g, " "),
  );

  return (
    <main className="relative flex flex-col gap-8 sm:overflow-hidden">
      <HeroSection character={character} />
      <div className="grid gap-8 sm:container">
        <MaterialCalculatorSection materials={materials} />
        <AscensionSection stats={character.stats} />
        <ActiveTalentSection actives={talents.actives} />
        <PassiveTalentSection passives={talents.passives} />
        <ConstellationSection constellations={constellations} />
      </div>
    </main>
  );
}

const HeroSection: React.FC<Pick<NamePageProps, "character">> = ({
  character,
}) => {
  return (
    <div className="grid-cols-10 text-sm sm:container lg:grid xl:text-base">
      <div className="col-span-full row-span-full overflow-hidden sm:overflow-visible lg:flex lg:items-center lg:justify-center">
        <div className="relative -left-1/4 -z-10 flex w-[150%] flex-col items-center justify-center lg:left-0 lg:w-full">
          <Image
            src={formatImageUrl(character.image)} // gacha-splash
            alt={`${character.name} gacha splash`}
            width={1920}
            height={960}
            priority={true}
          />
          {/* TODO: make after pseudo-element */}
          <div className="absolute bottom-0 z-0 h-24 w-full bg-gradient-to-t from-zinc-100 dark:from-zinc-900"></div>
        </div>
      </div>

      <DetailHeader character={character} />
      <div className="col-span-3 col-end-[-1] row-span-full flex flex-col items-center justify-center gap-2">
        <AttributeSection character={character} />
      </div>
    </div>
  );
};

const DetailHeader: React.FC<Pick<NamePageProps, "character">> = ({
  character,
}) => {
  // TODO: find better way of preventing long names from covering gacha image
  return (
    <div className="col-span-5 col-start-2 row-span-full mb-8 flex items-center">
      <div className="flex flex-col gap-2 px-5 sm:px-4 lg:-ml-5 lg:mt-32">
        <div className="flex w-fit items-center gap-2 rounded-lg bg-zinc-100/90 pr-3 dark:bg-zinc-900/90 lg:backdrop-blur-sm">
          <IconImage
            src={`/element-icons/${character.element}-icon.png`}
            alt={`${character.element} icon`}
            twH="h-[4.25rem]" // 68px
            twW="w-[4.25rem]" // 68px
          />
          <div className="flex flex-col py-5 sm:py-4">
            <h1 className="mb-1 text-3xl">{character.name}</h1>
            <StarRating rarity={character.rarity} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <CharacterBadge text={character.element} />
          {/* <CharacterBadge text={character.region} /> */}
          <CharacterBadge text={character.weapontype} />
          <CharacterBadge text={character.substat} />
          <CharacterBadge text={`${character.rarity}-star`} />
        </div>
      </div>
    </div>
  );
};

const CharacterBadge: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="rounded bg-zinc-300/50 px-2 py-1 text-xs dark:bg-zinc-700/70 lg:backdrop-blur-sm">
      {text}
    </div>
  );
};

const StarRating: React.FC<{ rarity: number }> = ({ rarity }) => {
  return (
    <div className="flex flex-nowrap gap-0.5">
      {[...Array(rarity)].map((_, i) => (
        <IconImage
          key={`star-${i}`}
          src="/star-rating.png"
          alt="Star Icon"
          twH="h-[1.125rem]" // 18px
          twW="w-[1.125rem]" // 18px
        />
      ))}
    </div>
  );
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const characters = getCharacterNames();

  const paths = characters.map((character) => ({
    name: formatNameUrl(character),
  }));

  return paths;
}
