type Vision =
  | "Pyro"
  | "Hydro"
  | "Dendro"
  | "Electro"
  | "Anemo"
  | "Cryo"
  | "Geo";
type Weapon = "Bow" | "Catalyst" | "Claymore" | "Polearm" | "Sword";
type Nation = "Mondstadt" | "Liyue" | "Inazuma" | "Outlander" | "Unknown";
type Rarity = 4 | 5;

interface SkillTalents {
  name: string;
  unlock: string;
  description: string;
  type: string;
}

interface PassiveTalents {
  name: string;
  unlock: string;
  description: string;
  level?: number;
}

interface Constellations {
  name: string;
  unlock: string;
  description: string;
  level: number;
}

interface CharacterResponse {
  name: string;
  vision: Vision;
  weapon: Weapon;
  nation: Nation;
  affiliation: string;
  rarity: Rarity;
  constellation: string;
  birthday: string;
  description: string;
  skillTalents: SkillTalents[];
  passiveTalents: PassiveTalents[];
  constellations: Constellations[];
  vision_key: string;
  weapon_type: string;
}

interface CharacterFilterInfo {
  name: string;
  name_url: string;
  vision: Vision;
  weapon: Weapon;
  nation: Nation;
  rarity: Rarity;
}

type CharacterSortKeys = keyof Omit<CharacterFilterInfo, "rarity" | "name_url">;

interface Attributes {
  vision: Set<Vision>;
  weapon: Set<Weapon>;
  nation: Set<Nation>;
  rarity: Set<Rarity>;
}
