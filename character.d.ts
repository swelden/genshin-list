type Weapons = "Bow" | "Catalyst" | "Claymore" | "Polearm" | "Sword";
type Nations = "Inazuma" | "Liyue" | "Mondstadt";
type Rarity = 4 | 5;
type Visions =
  | "Pyro"
  | "Hydro"
  | "Dendro"
  | "Electro"
  | "Anemo"
  | "Cryo"
  | "Geo";

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
  vision: Visions;
  weapon: Weapons;
  nation: Nations;
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
  vision: Visions;
  weapon: Weapons;
  nation: Nations;
  rarity: Rarity;
}
