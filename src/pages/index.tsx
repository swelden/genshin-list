import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Results from "../components/Results";
import Filters from "../components/Filters/Filters";
import useCharacters from "../hooks/useCharacters";
import * as genshindb from "genshin-db";
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
  const characters: string[] = genshindb
    .characters("names", { matchCategories: true })
    .filter((character) => character !== "Aether" && character !== "Lumine");

  const characterProps: CharacterFilterInfo[] = characters.map((character) => {
    const characterInfo = genshindb.characters(character)!;
    return {
      name: characterInfo.name,
      nameicon: characterInfo.images.nameicon,
      element: characterInfo.element,
      weapontype: characterInfo.weapontype,
      region: characterInfo.region,
      rarity: characterInfo.rarity,
      version: characterInfo.version,
    };
  });

  return {
    props: {
      characters: characterProps
        .sort((a, b) => b.name.localeCompare(a.name))
        .sort((a, b) => b.rarity.localeCompare(a.rarity)),
    },
  };
};

export default Home;
