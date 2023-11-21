export const myRound = (num: number, precision: number) => {
  const multiplier = 10 ** precision;
  return Math.round((num + Number.EPSILON) * multiplier) / multiplier;
};

export const formatImageUrl = (url: string) =>
  `https://res.cloudinary.com/genshin/image/upload/sprites/${url}.png`;

export const formatNameUrl = (name: string) =>
  name.toLowerCase().replace(/\s/g, "-");
