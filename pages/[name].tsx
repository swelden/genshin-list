import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Image from "next/image";
import * as genshindb from "genshin-db";

const CharacterPage: NextPage<Props> = ({ character }) => {
  console.log(character);
  return (
    <main className="container relative mb-12 grid flex-1 grid-rows-1 items-stretch gap-6 md:grid-cols-[2fr_4fr_3fr]">
      <Head>
        <title>Genshin List - {character.name}</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 flex items-center justify-center">
        <Image
          src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.image}.png`} // gacha-splash
          alt={`${character.name} gacha splash`}
          width={1920}
          height={960}
          // priority={true}
        />
      </div>
      <div className="col-start-1">{character.name}</div>
      <div className="col-start-3">{character.affiliation}</div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const characters: string[] = genshindb
    .characters("names", { matchCategories: true })
    .filter((character) => character !== "Aether" && character !== "Lumine");

  return {
    paths: characters.map((character) => ({
      params: { name: character.toLowerCase().replace(/\s/g, "-") },
    })),
    fallback: false,
  };
};

interface CharacterInfo
  extends Omit<genshindb.Character, "images" | "url" | "stats"> {
  image: string;
}

interface Props {
  character: CharacterInfo;
}

interface Params extends ParsedUrlQuery {
  name: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { name } = context.params!;
  const characterInfo = genshindb.characters(name.replace(/-/g, " "))!;
  // console.log(characterInfo);

  const { images, url, stats, ...character } = characterInfo;

  return {
    props: {
      character: { ...character, image: characterInfo.images.namegachasplash! },
    },
  };
};

export default CharacterPage;
