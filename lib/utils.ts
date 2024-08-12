import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ImageExtension } from "@/data/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function myRound(num: number, precision: number) {
  const multiplier = 10 ** precision;
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
}

export function formatNameUrl(name: string) {
  return name.toLowerCase().replace(/\s/g, "-");
}

export function unformatNameUrl(nameUrl: string) {
  return nameUrl.replace(/-/g, " ");
}

export function formatImageUrl(url: string) {
  // control where all images are retrieved from
  // do not retrieve images from "mihoyo.com" (it sends cookies)
  return formatAmbrUrl(url);
}

export function formatCloudinaryUrl(url: string) {
  return `https://res.cloudinary.com/genshin/image/upload/sprites/${url}.png`;
}

export function formatAmbrUrl(url: string) {
  return `https://api.ambr.top/assets/UI/${url}.png`;
}

export function formatLocalImageUrl(
  dir: "/" | "/elements" | "/weapons",
  imageFilename: string,
  imageExtension: ImageExtension = "png",
) {
  // make sure all images in public folder are lowercase
  return `/images${dir}/${imageFilename.toLowerCase()}.${imageExtension}`;
}

export function formatLongNumber(value: number | bigint) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 2,
  }).format(value);
}

export function sortString(a: string, b: string) {
  return a.localeCompare(b);
}

export function sortNumber(a: number, b: number) {
  return a - b;
}

export function sortStringAsNumber(a: string, b: string) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  });
}

export function isEqualSets(a: Set<unknown>, b: Set<unknown>) {
  if (a === b) return true;
  if (a.size !== b.size) return false;
  return Array.from(a).every((x) => b.has(x));
}

export function pick<T extends {}, K extends keyof T>(obj: T, ...keys: K[]) {
  return Object.fromEntries(
    keys.filter((key) => key in obj).map((key) => [key, obj[key]]),
  ) as Pick<T, K>;
}

export type PickValues<T, K extends keyof T> = T[K];

// https://github.com/pelotom/type-zoo/blob/master/types/index.d.ts
export type OmitStrict<T, K extends keyof T> = T extends any
  ? Pick<T, Exclude<keyof T, K>>
  : never;
