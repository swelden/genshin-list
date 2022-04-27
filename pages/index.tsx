import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Results from "../components/Results";
import Filters from "../components/Filters";
import useCharacters from "../hooks/useCharacters";
import React from "react";

export async function getStaticProps() {
  const urlBase = "https://api.genshin.dev/characters";
  const resp = await fetch(urlBase);
  const characters: string[] = await resp.json();

  const characterProps: CharacterFilterInfo[] = await Promise.all(
    characters.map(async (character): Promise<CharacterFilterInfo> => {
      const characterResp = await fetch(`${urlBase}/${character}`);
      const characterInfo: CharacterResponse = await characterResp.json();
      return {
        name:
          characterInfo.name === "Traveler"
            ? `${characterInfo.name} (${characterInfo.vision})`
            : characterInfo.name,
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
}

const Home: NextPage<{ characters: CharacterFilterInfo[] }> = ({
  characters: allCharacters,
}) => {
  const { characters, filter, setFilter } = useCharacters(allCharacters);

  const onSetFilter = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFilter(event.target.value);

  return (
    <div className="relative flex flex-col gap-6">
      <Head>
        <title>Genshin List</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen">
        <Navbar />
        <main className="container flex flex-col gap-6">
          <Filters onSetFilter={onSetFilter} />
          <Results characters={characters} />
        </main>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
