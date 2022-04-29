import Image from "next/image";

const Results: React.FC<{ characters: CharacterFilterInfo[] }> = ({
  characters,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_100px)] justify-center gap-3 sm:grid-cols-[repeat(auto-fill,_120px)] sm:gap-4 md:gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

// TODO: add motion-safe or motion-reduce where needed
const CharacterCard: React.FC<{ character: CharacterFilterInfo }> = ({
  character,
}) => {
  // console.log(character);
  return (
    <div
      className={`overflow-hidden rounded-md border-0 border-white shadow-sm transition duration-[400ms] hover:scale-110 hover:border-2 hover:shadow`}
    >
      <div
        className={`relative flex ${
          character.rarity === 4
            ? "bg-rare4"
            : character.nation === "Unknown"
            ? "bg-colab"
            : "bg-rare5"
        }`}
      >
        <Image
          src={`https://api.genshin.dev/characters/${character.name_url}/icon`}
          alt={`${character.name} thumb`}
          width={120}
          height={120}
        />
      </div>
      <div className="truncate bg-card-title px-2 py-0.5 text-center font-medium capitalize text-card-contrast">
        {character.name}
      </div>
    </div>
  );
};

export default Results;
