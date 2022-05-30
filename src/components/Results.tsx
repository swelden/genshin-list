import { CharacterCard } from "./Card";

type ResultsProps = React.FC<{ characters: CharacterFilterInfo[] }>;
// NOTE: might iterate through allCharacters and set display none to characters that were filtered out
const Results: ResultsProps = ({ characters }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_100px)] justify-center gap-3 sm:grid-cols-[repeat(auto-fill,_128px)] sm:gap-4 md:gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

export default Results;
