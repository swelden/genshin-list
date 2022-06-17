import type { GetStaticProps, NextPage } from "next";
import React from "react";
import * as genshindb from "genshin-db";
import Head from "next/head";
import Filters from "../components/Filters/Filters";
import CharacterList from "../components/CharacterList";
import useCharacters from "../hooks/useCharacters";
import { getCharacterNames } from "../backend/shared";

const Home: NextPage<{
  characters: CharacterFilterInfo[];
  regions: Nation[];
}> = ({ characters: allCharacters, regions }) => {
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
      </Head>
      <Filters
        setFilter={setFilter}
        setSortKey={setSortKey}
        setIsReversed={setIsReversed}
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
        regions={regions}
      />
      <CharacterList characters={characters} />
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const characters = getCharacterNames();

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

  const allRegions: Nation[] = [
    "Mondstadt",
    "Liyue",
    "Inazuma",
    "Sumeru",
    "Fontaine",
    "Natlan",
    "Snezhnaya",
    "Khaenri'ah",
  ];
  const foundRegions = new Set<Nation>();
  characterProps.forEach((character) => {
    foundRegions.add(character.region as Nation);
  });

  const regionProps: Nation[] = allRegions.filter((region) =>
    foundRegions.has(region)
  );

  return {
    props: {
      characters: characterProps
        .sort((a, b) => b.name.localeCompare(a.name))
        .sort((a, b) => b.rarity.localeCompare(a.rarity)),
      regions: regionProps,
    },
  };
};

export default Home;
