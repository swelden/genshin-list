import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageUrl } from "../utils/urls";
import IconImage from "./IconImage";

type CharacterCardProps = React.FC<{ character: CharacterFilterInfo }>;

// TODO: add motion-safe or motion-reduce where needed
export const CharacterCard: CharacterCardProps = ({ character }) => {
  return (
    <Link href={`/${character.name.toLowerCase().replace(/\s/g, "-")}`}>
      <a className="relative overflow-hidden rounded-md bg-gradient-to-t from-card-brown to-card-brown shadow-lg outline-none ring-1 ring-black/10 ring-offset-white transition duration-300 ease-in-out hocus:scale-110 hocus:ring-black/20 hocus:ring-offset-4 dark:to-card-brown/10 dark:shadow-zinc-600/50">
        <InnerCard
          bgGradient={
            character.rarity === "4"
              ? "bg-gradient-to-b from-[#5e5789] to-[#9c75b7]" // 4 star - purple
              : "bg-gradient-to-b from-[#945c2c] to-[#b27330]" // 5 star - gold
            // "_bg-gradient-to-b _from-[#9b3c56] _to-[#b4455a]" // colab  - red
          }
          imgSrc={imageUrl(character.nameicon)}
          alt={`${character.name} thumb`}
          label={character.name}
          isLabelHoverable={true}
          size={192}
        >
          <div className="absolute top-0.5 left-0.5">
            <IconImage
              src={`/element-icons/${character.element}-icon.png`}
              alt={`${character.element} icon`}
              twH="h-[1.875rem]"
              twW="w-[1.875rem]"
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
  alt: string;
  smallIcon: boolean;
  bgGradient?: string;
  size?: number;
  isUnoptimized?: boolean;
}> = ({
  label,
  imgSrc,
  alt,
  smallIcon,
  bgGradient = "bg-gradient-to-b from-[#323947] to-[#4a5366]",
  size = 96,
  isUnoptimized = false,
}) => {
  return (
    <div className="relative overflow-hidden rounded-md bg-gradient-to-t from-card-brown to-card-brown shadow-md ring-1 ring-black/10 dark:to-card-brown/10 dark:shadow-zinc-600/50">
      <InnerCard
        bgGradient={bgGradient}
        label={label}
        imgSrc={imgSrc}
        alt={alt}
        size={size}
        className={"text-xs lg:text-sm"}
        smallIcon={smallIcon}
        isUnoptimized={isUnoptimized}
      />
    </div>
  );
};

const InnerCard: React.FC<{
  bgGradient: string;
  label: string | number;
  imgSrc: string;
  alt: string;
  size: number;
  className?: string;
  children?: React.ReactNode;
  smallIcon?: boolean;
  isUnoptimized?: boolean;
  isLabelHoverable?: boolean;
}> = ({
  bgGradient,
  label,
  imgSrc,
  alt,
  size,
  className,
  children,
  smallIcon = false,
  isUnoptimized = false,
  isLabelHoverable = false,
}) => {
  return (
    <>
      <div
        className={`relative flex items-center justify-center overflow-hidden rounded-t-md rounded-br-[1.25rem] border-b border-white/20 ${bgGradient} ${
          smallIcon ? "p-2" : ""
        }`}
      >
        <Image
          src={imgSrc}
          alt={alt}
          width={size}
          height={size}
          unoptimized={isUnoptimized}
        />
        {children}
      </div>
      <div
        className="relative w-full px-2 py-0.5"
        title={isLabelHoverable ? `${label}` : undefined}
      >
        <span
          className={`relative block w-full truncate text-center capitalize text-card-navy ${className}`}
        >
          {label}
        </span>
      </div>
    </>
  );
};
