import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Image from "next/image";
import { formatUrl, imageUrl } from "../utils/urls";
import {
  AttributeSection,
  AscensionSection,
  ActiveTalentSection,
  PassiveTalentSection,
  ConstellationSection,
  MaterialCalculatorSection,
} from "../components/Sections";
import MaterialProvider from "../contexts/MaterialContext";
import IconImage from "../components/IconImage";
import { getCharacterNames } from "../backend/shared";
import { getNamePageProps, NamePageProps } from "../backend/name_page";

const CharacterPage: NextPage<NamePageProps> = ({
  character,
  materials,
  talents,
  constellations,
}) => {
  // console.log(character);

  return (
    <main className="relative flex flex-col gap-8 sm:overflow-hidden">
      <Head>
        <title>{character.name} - Genshin List</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
      </Head>

      <HeroSection character={character} />
      <div className="grid gap-8 sm:container">
        <MaterialProvider
          levelCosts={materials.characterCosts}
          talentCosts={materials.talentCosts}
        >
          <MaterialCalculatorSection materialData={materials.materialData} />
        </MaterialProvider>
        <AscensionSection stats={character.stats} />
        <ActiveTalentSection actives={talents.actives} />
        <PassiveTalentSection passives={talents.passives} />
        <ConstellationSection constellations={constellations} />
      </div>
    </main>
  );
};

const HeroSection: React.FC<Pick<NamePageProps, "character">> = ({
  character,
}) => {
  return (
    <div className="grid-cols-10 text-sm sm:container lg:grid xl:text-base">
      <div className="col-span-full row-span-full overflow-hidden sm:overflow-visible lg:flex lg:items-center lg:justify-center">
        <div className="relative -left-1/4 -z-10 flex w-[150%] flex-col items-center justify-center lg:left-0 lg:w-full">
          <Image
            src={imageUrl(character.image)} // gacha-splash
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
  // TODO: add container that spans max of 3 columns (to prevent long names from covering image)
  return (
    <div className="col-span-5 col-start-2 row-span-full mb-8 flex items-center">
      <div className="flex flex-col gap-2 px-5 sm:px-4 lg:mt-32 lg:-ml-5">
        <div className="flex w-fit items-center gap-2 rounded-lg bg-zinc-100/90 pr-3 dark:bg-zinc-900/90 lg:backdrop-blur-sm">
          <IconImage
            src={`/element-icons/${character.element}-icon.png`}
            alt={`${character.element} icon`}
            twH="h-[4.25rem]"
            twW="w-[4.25rem]"
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
    <div className="rounded bg-zinc-300/50 py-1 px-2 text-xs dark:bg-zinc-700/70 lg:backdrop-blur-sm">
      {text}
    </div>
  );
};

const StarRating: React.FC<{ rarity: number }> = ({ rarity }) => {
  return (
    <div className="flex flex-nowrap gap-0.5">
      {[...Array(rarity)].map((_, i) => (
        <Image
          key={`star-${i}`}
          src="/star-rating.png"
          alt="Star Icon"
          width={18}
          height={18}
          quality={100}
        />
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const characters = getCharacterNames();

  return {
    paths: characters.map((character) => ({
      params: { name: formatUrl(character) },
    })),
    fallback: false,
  };
};

interface Params extends ParsedUrlQuery {
  name: string;
}

export const getStaticProps: GetStaticProps<NamePageProps, Params> = async (
  context
) => {
  const name = context.params!.name.replace(/-/g, " ");
  const pageProps = getNamePageProps(name);

  return {
    props: pageProps,
  };
};

export default CharacterPage;
