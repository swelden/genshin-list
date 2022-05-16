import Image from "next/image";
import Link from "next/link";
import { imageUrl } from "../utils/urls";

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
    <Link href={`/${character.name.toLowerCase().replace(/\s/g, "-")}`}>
      <a className="overflow-hidden rounded-md bg-card-title shadow-sm outline-none ring-black/20 ring-offset-4 ring-offset-white transition duration-300 ease-in-out hover:scale-110 hover:ring-1 focus-visible:scale-110 focus-visible:ring-1 dark:shadow-zinc-600/50">
        <div
          className={`relative flex overflow-hidden rounded-br-[1.25rem] ${
            character.rarity === "4"
              ? "bg-gradient-to-b from-[#5e5789] to-[#9c75b7]" // 4 star - purple
              : character.region === ""
              ? "bg-gradient-to-b from-[#9b3c56] to-[#b4455a]" // colab  - red
              : "bg-gradient-to-b from-[#945c2c] to-[#b27330]" // 5 star - gold
          }`}
        >
          <Image
            src={imageUrl(character.nameicon)}
            alt={`${character.name} thumb`}
            width={128}
            height={128}
          />
          <div className="absolute top-0.5 left-0.5">
            <Image
              src={`/element-icons/${character.element}-icon.png`}
              alt={`${character.element} icon`}
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className="relative w-full px-2 py-0.5">
          <span className="relative block w-full truncate text-center font-medium capitalize text-card-contrast">
            {character.name}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default Results;
