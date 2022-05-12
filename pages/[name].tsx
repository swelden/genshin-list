import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Image from "next/image";
import * as genshindb from "genshin-db";

const CharacterPage: NextPage<Props> = ({
  character,
  talents,
  constellations,
}) => {
  console.log(character);
  console.log(talents);
  console.log(constellations);
  return (
    <main className="relative mb-14 lg:flex-1">
      <Head>
        <title>Genshin List - {character.name}</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="top-0 left-0 right-0 bottom-0 -z-10 items-start justify-center lg:absolute lg:flex lg:items-center">
        <Image
          src={`https://res.cloudinary.com/genshin/image/upload/sprites/${character.image}.png`} // gacha-splash
          alt={`${character.name} gacha splash`}
          width={1920}
          height={960}
          // priority={true}
        />
      </div>
      <div className="container grid grid-cols-none grid-rows-1 items-stretch gap-6 lg:grid-cols-[2fr_4fr_3fr]">
        <div className="lg:col-start-1">{character.name}</div>
        <div className="lg:col-start-3">{character.affiliation}</div>
      </div>
    </main>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const characters: string[] = genshindb
    .characters("names", { matchCategories: true })
    .filter((character) => character !== "Aether" && character !== "Lumine");

  return {
    paths: characters.map((character) => ({
      params: { name: character.toLowerCase().replace(/\s/g, "-") },
    })),
    fallback: false,
  };
};

interface ActiveTalent extends genshindb.PassiveTalentDetail {
  category: string;
  icon: string;
}

const getActives = (talents: genshindb.Talent): ActiveTalent[] => {
  const images = talents.images!;

  return [
    {
      category: "Normal Attack",
      ...talents.combat1,
      icon: images.combat1,
    },
    {
      category: "Elemental Skill",
      ...talents.combat2,
      icon: images.combat2,
    },
    {
      category: "Elemental Burst",

      ...talents.combat3,
      icon: images.combat3,
    },
    // So far only Mona and Ayaka have an alternate sprint
    ...(talents.combatsp !== undefined
      ? [
          {
            category: "Alternate Sprint",
            ...talents.combatsp,
            icon: images.combatsp!,
          },
        ]
      : []),
  ];
};

interface PassiveTalent extends genshindb.PassiveTalentDetail {
  icon: string;
}

const getPassives = (talents: genshindb.Talent): PassiveTalent[] => {
  let passiveNum = 1; // 4 is the current max passives | held by Kokomi
  let passiveStr = `passive${passiveNum}`;
  const images = talents.images!;
  const passives: PassiveTalent[] = [];

  while (talents.hasOwnProperty(passiveStr)) {
    passives.push({
      ...(talents[
        passiveStr as keyof genshindb.Talent
      ] as genshindb.PassiveTalentDetail),
      icon: images[passiveStr as keyof typeof images]!,
    });
    passiveNum++;
    passiveStr = `passive${passiveNum}`;
  }
  return passives;
};

interface MaterialIconMap {
  [key: string]: string;
}

const getMaterialIcons = (costItem: {
  [key: string]: genshindb.Items[];
}): MaterialIconMap => {
  const materialIconMap: MaterialIconMap = {};
  for (const items of Object.values(costItem)) {
    for (const { name } of items) {
      const {
        images: { nameicon },
      } = genshindb.materials(name)!;
      materialIconMap[name] = nameicon;
    }
  }

  return materialIconMap;
};

// TODO: Implement this function
// Get array of stats at all ascension levels and include lvl 1 and 90
const getCharStats = (stats: genshindb.StatFunction) => {
  // ascension levels at 20, 40, 50, 60, 70, 80
  // const params = [
  //   ["1"],
  //   ["20"],
  //   ["20", "+"],
  //   ["40"],
  //   ["40", "+"],
  //   ["50"],
  //   ["50", "+"],
  //   ["60"],
  //   ["60", "+"],
  //   ["70"],
  //   ["70", "+"],
  //   ["80"],
  //   ["80", "+"],
  //   ["90"],
  // ];
  return "";
};

interface CharacterInfo
  extends Omit<
    genshindb.Character,
    | "association"
    | "birthday"
    | "fullname"
    | "images"
    | "rarity"
    | "stats"
    | "url"
    | "version"
  > {
  image: string;
  rarity: number;
  materialIcons: MaterialIconMap;
  stats: any;
}

interface TalentInfo {
  actives: ActiveTalent[];
  activeCosts: genshindb.Talent["costs"];
  passives: PassiveTalent[];
  materialIcons: MaterialIconMap;
}

interface ConstellationInfo {
  icon: string;
  name: string;
  effect: string;
}

interface Props {
  character: CharacterInfo;
  talents: TalentInfo;
  constellations: ConstellationInfo[];
}

interface Params extends ParsedUrlQuery {
  name: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const name = context.params!.name.replace(/-/g, " ");
  const characterInfo = genshindb.characters(name)!;
  const characterTalents = genshindb.talents(name)!;
  const characterConstellations = genshindb.constellations(name)!;

  const characterProps = {
    name: characterInfo.name,
    title: characterInfo.title,
    description: characterInfo.description,
    rarity: parseInt(characterInfo.rarity, 10),
    element: characterInfo.element,
    weapontype: characterInfo.weapontype,
    substat: characterInfo.substat,
    gender: characterInfo.gender,
    body: characterInfo.body,
    region: characterInfo.region,
    affiliation: characterInfo.affiliation,
    birthdaymmdd: characterInfo.birthdaymmdd,
    constellation: characterInfo.constellation,
    cv: characterInfo.cv, // NOTE: might only get english cv
    costs: characterInfo.costs,
    image: characterInfo.images.namegachasplash!,
    materialIcons: getMaterialIcons(characterInfo.costs),
    stats: getCharStats(characterInfo.stats),
  };

  const talentProps: TalentInfo = {
    actives: getActives(characterTalents),
    activeCosts: characterTalents.costs,
    passives: getPassives(characterTalents),
    materialIcons: getMaterialIcons(characterTalents.costs),
  };

  const constellationProps = [
    {
      ...characterConstellations.c1,
      icon: characterConstellations.images.c1,
    },
    {
      ...characterConstellations.c2,
      icon: characterConstellations.images.c2,
    },
    {
      ...characterConstellations.c3,
      icon: characterConstellations.images.c3,
    },
    {
      ...characterConstellations.c4,
      icon: characterConstellations.images.c4,
    },
    {
      ...characterConstellations.c5,
      icon: characterConstellations.images.c5,
    },
    {
      ...characterConstellations.c6,
      icon: characterConstellations.images.c6,
    },
  ];

  return {
    props: {
      character: characterProps,
      talents: talentProps,
      constellations: constellationProps,
    },
  };
};

export default CharacterPage;
