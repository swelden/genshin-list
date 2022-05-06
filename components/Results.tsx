import Image from "next/image";
import Link from "next/link";

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

type CharacterCardProps = React.FC<{ character: CharacterFilterInfo }>;
// TODO: add motion-safe or motion-reduce where needed
const CharacterCard: CharacterCardProps = ({ character }) => {
  return (
    <Link href={`/${character.name_url}`}>
      <a className="overflow-hidden rounded-md shadow-sm transition duration-300 ease-in-out hover:scale-110 hover:shadow-[0_0_2px_4px_#e9e5dc;] dark:shadow-zinc-600/50 dark:hover:shadow-white">
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
            src={`/characters/${character.name_url}-icon-big.png`}
            alt={`${character.name} thumb`}
            width={128}
            height={128}
          />
          <div className="absolute top-0.5 left-0.5">
            <Image
              src={`/element-icons/${character.vision}-icon.png`}
              alt={`${character.vision} icon`}
              width={30}
              height={30}
            />
          </div>
        </div>
        {/* box-shadow y has to be half of before: height */}
        <div className="relative w-full bg-card-title px-2 py-0.5 before:absolute before:-top-10 before:right-0 before:h-10 before:w-12 before:rounded-br-[50%] before:bg-transparent before:shadow-[0_1.25rem_0_0] before:shadow-card-title">
          <span className="relative block w-full truncate text-center font-medium capitalize text-card-contrast">
            {character.name}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default Results;
