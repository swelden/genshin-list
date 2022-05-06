import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

const CharacterPage: NextPage<Props> = ({ character }) => {
  console.log(character);
  return (
    <main className="container flex flex-col gap-6 md:flex-row">
      <Head>
        <title>Genshin List - {character.name}</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>{character.name}</div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const urlBase = "https://api.genshin.dev/characters";
  const resp = await fetch(urlBase);
  const characters: string[] = ((await resp.json()) as string[]).filter(
    (character) => !character.startsWith("traveler")
  );

  return {
    paths: characters.map((character) => ({
      params: { name: character },
    })),
    fallback: false,
  };
};

type Props = {
  character: AllCharacterInfo;
};

interface Params extends ParsedUrlQuery {
  name: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const { name } = context.params!;
  const urlBase = "https://api.genshin.dev/characters";
  const resp = await fetch(`${urlBase}/${name}`);
  const character: AllCharacterInfo = {
    ...(await resp.json()),
    name_url: name,
  };

  return { props: { character } };
};

export default CharacterPage;
