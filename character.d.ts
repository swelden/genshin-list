type Vision =
  | "Pyro"
  | "Hydro"
  | "Dendro"
  | "Electro"
  | "Anemo"
  | "Cryo"
  | "Geo";
type Weapon = "Bow" | "Catalyst" | "Claymore" | "Polearm" | "Sword";
type Nation =
  | "Mondstadt"
  | "Liyue"
  | "Inazuma"
  | "Sumeru"
  | "Fontaine"
  | "Natlan"
  | "Snezhnaya"
  | "Khaenri'ah"
  | ""; // Unknown
type Rarity = "4" | "5";

interface CharacterFilterInfo {
  name: string;
  nameicon: string;
  element: string;
  weapontype: string;
  region: string;
  rarity: string;
  version: string;
}

type CharacterSortKeys = keyof Omit<CharacterFilterInfo, "nameicon">;

interface Attributes {
  element: Set<Vision>;
  weapontype: Set<Weapon>;
  region: Set<Nation>;
  rarity: Set<Rarity>;
}
