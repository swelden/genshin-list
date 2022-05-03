import Image from "next/image";

type ResultsProps = React.FC<{ characters: CharacterFilterInfo[] }>;
// NOTE: might iterate through allCharacters and set display none to characters that were filtered out
const Results: ResultsProps = ({ characters }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_100px)] justify-center gap-3 sm:grid-cols-[repeat(auto-fill,_120px)] sm:gap-4 md:gap-6">
      {characters.map((character) => (
        <CharacterCard key={character.name} character={character} />
      ))}
    </div>
  );
};

type CharacterCardProps = React.FC<{ character: CharacterFilterInfo }>;
// TODO: add motion-safe or motion-reduce where needed
const CharacterCard: CharacterCardProps = ({ character }) => {
  return (
    <div className="translate scale-100 transform-gpu overflow-hidden rounded-md border-white shadow-sm transition duration-500 hover:scale-110 hover:shadow-lg dark:shadow-zinc-600/50">
      <div
        className={`relative flex overflow-hidden ${
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
      {/* box-shadow y has to be half of before: height */}
      <div className="relative w-full bg-card-title px-2 py-0.5 before:absolute before:-top-10 before:right-0 before:h-10 before:w-12 before:rounded-br-[50%] before:bg-transparent before:shadow-[0_1.25rem_0_0] before:shadow-card-title">
        <span className="relative block w-full truncate text-center font-medium capitalize text-card-contrast">
          {character.name}
        </span>
      </div>
    </div>
  );
};

export default Results;
