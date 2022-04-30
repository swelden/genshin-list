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
    const newSet = new Set<Visions | Weapons | Nations | Rarity>(
      attrFilter[category]
    );

    if (newSet.has(attr)) {
      newSet.delete(attr);
    } else {
      newSet.add(attr);
    }

    setAttrFilter({ ...attrFilter, [category]: newSet });
  };

  return (
    <div className="flex gap-2 rounded-lg bg-slate-300 p-1">
      {attrData.map((attr) => (
        <button
          key={attr}
          onClick={() => handleFilter(attr)}
          className={`cursor-pointer rounded-md p-1 px-2 hover:bg-blue-50 ${
            (
              attrFilter[category] as Set<Visions | Weapons | Nations | Rarity>
            ).has(attr)
              ? "bg-blue-100"
              : ""
          }`}
        >
          {attr}
        </button>
      ))}
    </div>
  );
};

export default AttributeFilter;
