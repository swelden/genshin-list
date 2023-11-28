import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const myRound = (num: number, precision: number) => {
  const multiplier = 10 ** precision;
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};

export const formatImageUrl = (url: string) =>
  `https://res.cloudinary.com/genshin/image/upload/sprites/${url}.png`;

export const formatNameUrl = (name: string) =>
  name.toLowerCase().replace(/\s/g, "-");

export const formatLocalImageUrl = (
  dir: "/" | "/elements" | "/weapons",
  imageFile: string,
) => {
  return `/images${dir}/${imageFile.toLowerCase()}.png`;
};
