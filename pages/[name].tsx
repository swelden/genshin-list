import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";
import Image from "next/image";
import * as genshindb from "genshin-db";
import { imageUrl } from "../utils/urls";
import { AttributeSection, ConstellationSection } from "../components/Sections";

const CharacterPage: NextPage<Props> = ({
  character,
  talents,
  constellations,
}) => {
  console.log(character);
  console.log(talents);
  console.log(constellations);

  return (
    <main className="container relative flex flex-col gap-5">
      <Head>
        <title>Genshin List - {character.name}</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection character={character} />
      <div className="grid gap-5">
        <div className="bg-gray-500/30 py-32">Ascensions</div>
        <div className="bg-gray-500/30 py-32">Talents</div>
        <ConstellationSection constellations={constellations} />
      </div>
    </main>
  );
};

const HeroSection: React.FC<Pick<Props, "character">> = ({ character }) => {
  return (
    <div className="grid-cols-10 text-sm lg:grid xl:text-base">
      <div className="relative -z-10 col-span-full row-span-full flex items-center justify-center">
        <Image
          src={imageUrl(character.image)} // gacha-splash
          alt={`${character.name} gacha splash`}
          width={1920}
          height={960}
          // priority={true}
        />
        {/* TODO: make after pseudo-element */}
        <div className="absolute bottom-0 h-16 w-full bg-gradient-to-t from-zinc-50 dark:from-zinc-900"></div>
      </div>
      <DetailHeader character={character} />
      <div className="col-span-3 col-end-[-1] row-span-full flex flex-col items-center justify-center gap-2">
        <AttributeSection character={character} />
      </div>
    </div>
  );
};

const DetailHeader: React.FC<Pick<Props, "character">> = ({ character }) => {
  return (
    <div className="col-span-full col-start-2 row-span-full mb-3 flex items-center">
      <div className="rounded-lg bg-zinc-50/90 p-3 backdrop-blur-sm dark:bg-zinc-900/90">
        <div className="mb-1 flex h-min items-center gap-3">
          <h1 className="text-3xl">{character.name}</h1>
          <Image
            src={`/element-icons/${character.element}-icon.png`}
            alt={`${character.element} icon`}
            width={24}
            height={24}
          />
        </div>
        <StarRating rarity={character.rarity} />
      </div>
    </div>
  );
};

const StarRating: React.FC<{ rarity: number }> = ({ rarity }) => {
  return (
    <div className="flex flex-nowrap gap-1">
      {[...Array(rarity)].map((_, i) => (
        <Image
          key={`star-${i}`}
          src="/star-rating.png"
          alt="Star Icon"
          width={18}
          height={18}
          quality={100}
        />
      ))}
    </div>
  );
};

// === SERVER BELOW ===

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

// TODO: add different color for dark and light
const ElementColor = {
  Pyro: "text-pyro",
  Hydro: "text-hydro",
  Dendro: "text-dendro",
  Electro: "text-electro",
  Anemo: "text-anemo",
  Cryo: "text-cryo",
  Geo: "text-geo",
};

// NOTE: might sanitize because I don't have control over text
const formatMarkdown = (text: string): string => {
  return text
    .replace(
      /\*\*([^*]+)\*\*/g, // **text** -> <span>text</span>
      '<span class="text-gold-500 dark:text-gold-400">$1</span>'
    )
    .replace(
      /(AoE\s)?(Pyro|Hydro|Dendro|Electro|Anemo|Cryo|Geo)(\s(?:DMG|RES))?(\sBonus)?(?=\W)/g,
      (
        match,
        _p1: string | undefined,
        p2: Vision,
        _p3: string | undefined,
        _p4: string | undefined
      ) => {
        // p1 -> p4 because there are 4 capture groups
        return `<span class="${ElementColor[p2]}">${match}</span>`;
      }
    );
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

export interface Props {
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
      name: characterConstellations.c1.name,
      effect: formatMarkdown(characterConstellations.c1.effect),
      icon: characterConstellations.images.c1,
    },
    {
      name: characterConstellations.c2.name,
      effect: formatMarkdown(characterConstellations.c2.effect),
      icon: characterConstellations.images.c2,
    },
    {
      name: characterConstellations.c3.name,
      effect: formatMarkdown(characterConstellations.c3.effect),
      icon: characterConstellations.images.c3,
    },
    {
      name: characterConstellations.c4.name,
      effect: formatMarkdown(characterConstellations.c4.effect),
      icon: characterConstellations.images.c4,
    },
    {
      name: characterConstellations.c5.name,
      effect: formatMarkdown(characterConstellations.c5.effect),
      icon: characterConstellations.images.c5,
    },
    {
      name: characterConstellations.c6.name,
      effect: formatMarkdown(characterConstellations.c6.effect),
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
