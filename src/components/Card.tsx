import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageUrl } from "../utils/urls";

type CharacterCardProps = React.FC<{ character: CharacterFilterInfo }>;

// TODO: add motion-safe or motion-reduce where needed
export const CharacterCard: CharacterCardProps = ({ character }) => {
  return (
    <Link href={`/${character.name.toLowerCase().replace(/\s/g, "-")}`}>
      <a className="relative overflow-hidden rounded-md bg-gradient-to-t from-card-title to-card-title shadow-lg outline-none ring-1 ring-black/10 ring-offset-white transition duration-300 ease-in-out hocus:scale-110 hocus:ring-black/20 hocus:ring-offset-4 dark:to-card-title/10 dark:shadow-zinc-600/50">
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
  smallIcon: boolean;
  bgGradient?: string;
  size?: number;
}> = ({
  label,
  imgSrc,
  smallIcon,
  bgGradient = "bg-gradient-to-b from-[#323947] to-[#4a5366]",
  size = 96,
}) => {
  return (
    <div className="relative overflow-hidden rounded-md bg-gradient-to-t from-card-title to-card-title shadow-md ring-1 ring-black/10 dark:to-card-title/10 dark:shadow-zinc-600/50">
      <InnerCard
        bgGradient={bgGradient}
        label={label}
        imgSrc={imgSrc}
        size={size}
        className={"text-xs lg:text-sm"}
        smallIcon={smallIcon}
      />
    </div>
  );
};

const InnerCard: React.FC<{
  bgGradient: string;
  label: string | number;
  imgSrc: string;
  size: number;
  className?: string;
  children?: React.ReactNode;
  smallIcon?: boolean;
}> = ({
  bgGradient,
  label,
  imgSrc,
  size,
  className,
  children,
  smallIcon = false,
}) => {
  return (
    <>
      <div
        className={`relative flex overflow-hidden rounded-t-md rounded-br-[1.25rem] border-b border-white/20 ${bgGradient} ${
          smallIcon ? "p-2" : ""
        }`}
      >
        <Image src={imgSrc} alt={`${label} thumb`} width={size} height={size} />
        {children}
      </div>
      <div className="relative w-full px-2 py-0.5">
        <span
          className={`relative block w-full truncate text-center capitalize text-card-contrast ${className}`}
        >
          {label}
        </span>
      </div>
    </>
  );
};
