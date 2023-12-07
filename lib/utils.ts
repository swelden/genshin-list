import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function myRound(num: number, precision: number) {
  const multiplier = 10 ** precision;
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}

export function formatImageUrl(url: string) {
  return `https://res.cloudinary.com/genshin/image/upload/sprites/${url}.png`;
}

export function formatAmbrUrl(url: string) {
  return `https://api.ambr.top/assets/UI/${url}.png`;
}

export function formatNameUrl(name: string) {
  return name.toLowerCase().replace(/\s/g, "-");
}

export function formatLocalImageUrl(
  dir: "/" | "/elements" | "/weapons",
  imageFile: string,
) {
  return `/images${dir}/${imageFile.toLowerCase()}.png`;
}

export function pick<T extends {}, K extends keyof T>(obj: T, ...keys: K[]) {
  return Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]]),
  ) as Pick<T, K>;
}
