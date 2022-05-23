import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageUrl } from "../utils/urls";

type CharacterCardProps = React.FC<{ character: CharacterFilterInfo }>;

// TODO: add motion-safe or motion-reduce where needed
export const CharacterCard: CharacterCardProps = ({ character }) => {
  return (
    <Link href={`/${character.name.toLowerCase().replace(/\s/g, "-")}`}>
      <a className="overflow-hidden rounded-md bg-card-title shadow-sm outline-none ring-black/20 ring-offset-4 ring-offset-white transition duration-300 ease-in-out hover:scale-110 hover:ring-1 focus-visible:scale-110 focus-visible:ring-1 dark:shadow-zinc-600/50">
        <InnerCard
          bgGradient={
            character.rarity === "4"
              ? "bg-gradient-to-b from-[#5e5789] to-[#9c75b7]" // 4 star - purple
              : character.region === ""
              ? "bg-gradient-to-b from-[#9b3c56] to-[#b4455a]" // colab  - red
              : "bg-gradient-to-b from-[#945c2c] to-[#b27330]" // 5 star - gold
          }
          imgSrc={imageUrl(character.nameicon)}
          label={character.name}
          size={128}
        >
          <div className="absolute top-0.5 left-0.5">
            <Image
              src={`/element-icons/${character.element}-icon.png`}
              alt={`${character.element} icon`}
              width={30}
              height={30}
            />
          </div>
        </InnerCard>
      </a>
    </Link>
  );
};

export const ItemCard: React.FC<{
  label: string | number;
  imgSrc: string;
  bgGradient?: string;
  size?: number;
}> = ({
  label,
  imgSrc,
  bgGradient = "bg-gradient-to-b from-[#323947] to-[#4a5366]",
  size = 92,
}) => {
  return (
    <div className="overflow-hidden rounded-md bg-card-title shadow-sm dark:shadow-zinc-600/50">
      <InnerCard
        bgGradient={bgGradient}
        label={label}
        imgSrc={imgSrc}
        size={size}
      />
    </div>
  );
};

// TODO: fix slight white corner border
const InnerCard: React.FC<{
  bgGradient: string;
  label: string | number;
  imgSrc: string;
  size: number;
  children?: React.ReactNode;
}> = ({ bgGradient, label, imgSrc, size, children }) => {
  return (
    <>
      <div
        className={`relative flex overflow-hidden rounded-t-md rounded-br-[1.25rem] ${bgGradient}`}
      >
        <Image src={imgSrc} alt={`${label} thumb`} width={size} height={size} />
        {children}
      </div>
      <div className="relative w-full px-2 py-0.5">
        <span className="relative block w-full truncate text-center font-medium capitalize text-card-contrast">
          {label}
        </span>
      </div>
    </>
  );
};
