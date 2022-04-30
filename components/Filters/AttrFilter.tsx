const visions: Visions[] = [
  "Pyro",
  "Hydro",
  "Dendro",
  "Electro",
  "Anemo",
  "Cryo",
  "Geo",
];
const weapons: Weapons[] = ["Bow", "Catalyst", "Claymore", "Polearm", "Sword"];
const nations: Nations[] = ["Inazuma", "Liyue", "Mondstadt", "Unknown"];
const rarities: Rarity[] = [4, 5];

const AttributeFilter: React.FC<{
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}> = ({ attrFilter, setAttrFilter }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2 sm:col-span-2">
      <FilterContainer
        attrData={visions}
        category="vision"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={weapons}
        category="weapon"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={nations}
        category="nation"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={rarities}
        category="rarity"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
    </div>
  );
};

type AttrData = Visions[] | Weapons[] | Nations[] | Rarity[];
const FilterContainer: React.FC<{
  attrData: AttrData;
  category: keyof Attributes;
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}> = ({ attrData, category, attrFilter, setAttrFilter }) => {
  const handleFilter = (attr: Visions | Weapons | Nations | Rarity) => {
    const newSet = new Set(
      attrFilter[category] as Set<Visions | Weapons | Nations | Rarity>
    );

    if (newSet.has(attr)) {
      newSet.delete(attr);
    } else {
      newSet.add(attr);
    }

    setAttrFilter({ ...attrFilter, [category]: newSet });
  };

  return (
    <div className="flex gap-2">
      {attrData.map((attr) => (
        <div
          key={attr}
          onClick={() => handleFilter(attr)}
          className="cursor-pointer"
        >
          {attr}
        </div>
      ))}
    </div>
  );
};

export default AttributeFilter;
