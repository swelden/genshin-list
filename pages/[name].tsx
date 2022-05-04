import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

export const getStaticPaths: GetStaticPaths = async () => {
  const urlBase = "https://api.genshin.dev/characters";
  const resp = await fetch(urlBase);
  const characters: string[] = await resp.json();

  return {
    paths: characters.map((character) => ({
      params: { name: character },
    })),
    fallback: false,
  };
};

type Props = {
  character: CharacterResponse;
};

interface Params extends ParsedUrlQuery {
  name: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  const urlBase = "https://api.genshin.dev/characters";
  const resp = await fetch(`${urlBase}/${params.name}`);
  const character: CharacterResponse = await resp.json();

  return { props: { character } };
};

const CharacterPage: NextPage<Props> = ({ character }) => {
  console.log(character);
  return <div>{character.name}</div>;
};

export default CharacterPage;
