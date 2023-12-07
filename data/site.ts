export type SiteConfig = typeof siteConfig;

const BASE_URL = "https://genshin-list.vercel.app";

export const siteConfig = {
  name: "Genshin List",
  url: BASE_URL,
  ogImage: `${BASE_URL}/og.jpg`,
  description:
    "Find and filter characters from Genshin Impact. Calculate required materials to level up any character.",
  links: {
    github: "https://github.com/swelden/genshin-list",
  },
};
