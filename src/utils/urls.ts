export const imageUrl = (url: string) =>
  `https://res.cloudinary.com/genshin/image/upload/sprites/${url}.png`;

export const formatUrl = (str: string) => str.toLowerCase().replace(/\s/g, "-");
