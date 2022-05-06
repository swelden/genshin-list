import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Results from "../components/Results";
import Filters from "../components/Filters/Filters";
import useCharacters from "../hooks/useCharacters";
import React from "react";

const Home: NextPage<{ characters: CharacterFilterInfo[] }> = ({
  characters: allCharacters,
}) => {
  const {
    characters,
    filter,
    setFilter,
    setSortKey,
    setIsReversed,
    attrFilter,
    setAttrFilter,
  } = useCharacters(allCharacters);

  return (
    <main className="container flex flex-col gap-6">
      <Head>
        <title>Genshin List</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filters
        setFilter={setFilter}
        setSortKey={setSortKey}
        setIsReversed={setIsReversed}
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <Results characters={characters} />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const urlBase = "https://api.genshin.dev/characters";
  const resp = await fetch(urlBase);
  const characters: string[] = ((await resp.json()) as string[]).filter(
    (character) => !character.startsWith("traveler")
  );

  const characterProps: CharacterFilterInfo[] = await Promise.all(
    characters.map(async (character): Promise<CharacterFilterInfo> => {
      const characterResp = await fetch(`${urlBase}/${character}`);
      const characterInfo: CharacterResponse = await characterResp.json();
      return {
        name: characterInfo.name,
        name_url: character,
        vision: characterInfo.vision,
        weapon: characterInfo.weapon,
        nation: characterInfo.nation,
        rarity: characterInfo.rarity,
      };
    })
  );

  return {
    props: {
      characters: characterProps,
    },
  };
};

export default Home;
