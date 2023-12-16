import { CharacterList } from "@/components/character-list";
import { FilterHub } from "@/components/filters/filter-hub";

export default function Home() {
  return (
    <main className="container flex flex-col gap-6">
      <FilterHub />
      <CharacterList />
    </main>
  );
}
