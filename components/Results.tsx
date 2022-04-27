import Image from "next/image";

const Results: React.FC<{ characters: CharacterFilterInfo[] }> = ({
  characters,
}) => {
  return (
    <div className="flex flex-wrap items-start justify-center">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

const CharacterCard: React.FC<{ character: CharacterFilterInfo }> = ({
  character,
}) => {
  return (
    <div className="m-3 flex w-[120px] flex-col overflow-hidden rounded-xl bg-yellow-300">
      <Image
        src={`https://api.genshin.dev/characters/${character.name_url}/icon`}
        alt={`${character} thumb`}
        width={120}
        height={120}
      />
      <div className="truncate bg-amber-100 px-2 py-1 text-center capitalize">
        {character.name}
      </div>
    </div>
  );
};

export default Results;
