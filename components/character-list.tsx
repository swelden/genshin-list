"use client";

import { useFilteredCharacters } from "@/hooks/use-characters";
import { CharacterCard } from "@/components/card-templates";

interface CharacterListProps {}

export function CharacterList({}: CharacterListProps) {
  const filteredCharacters = useFilteredCharacters();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_6rem)] justify-center gap-4 sm:grid-cols-[repeat(auto-fill,_8.25rem)] sm:gap-5 lg:gap-6">
      {filteredCharacters.map((character) => (
        <CharacterCard key={character.name} character={character} size={132} />
      ))}
    </div>
  );
}
