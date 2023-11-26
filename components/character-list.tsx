import { CharacterCard } from "@/components/card";

type ResultsProps = React.FC<{ characters: CharacterFilterInfo[] }>;
// NOTE: might iterate through allCharacters and set display none to characters that were filtered out
const CharacterList: ResultsProps = ({ characters }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_6rem)] justify-center gap-4 sm:grid-cols-[repeat(auto-fill,_8.25rem)] sm:gap-5 lg:gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

export default CharacterList;
