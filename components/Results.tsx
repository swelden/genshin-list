import Image from "next/image";

const Results: React.FC<{ characters: CharacterFilterInfo[] }> = ({
  characters,
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_130px)] justify-center gap-3 md:gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

const CharacterCard: React.FC<{ character: CharacterFilterInfo }> = ({
  character,
}) => {
  console.log(character);
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl ${
        character.rarity === 4
          ? "bg-rare4"
          : character.nation === "Unknown"
          ? "bg-colab"
          : "bg-rare5"
      }`}
    >
      <Image
        src={`https://api.genshin.dev/characters/${character.name_url}/icon`}
        alt={`${character} thumb`}
        width={130}
        height={130}
      />
      <div className="truncate bg-card-title px-2 py-1 text-center font-medium capitalize">
        {character.name}
      </div>
    </div>
  );
};

export default Results;
