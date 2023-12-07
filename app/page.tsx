import { getAllCharacters } from "@/data/retrieve";
import { MainCharacterFilterList } from "@/components/main-character-filter-list";

export default function Home() {
  const allCharacters = getAllCharacters();

  return (
    <main className="container flex flex-col gap-6">
      <MainCharacterFilterList allCharacters={allCharacters} />
    </main>
  );
}
