const visions: readonly Vision[] = [
  "Pyro",
  "Hydro",
  "Dendro",
  "Electro",
  "Anemo",
  "Cryo",
  "Geo",
] as const;
const weapons: readonly Weapon[] = [
  "Bow",
  "Catalyst",
  "Claymore",
  "Polearm",
  "Sword",
] as const;
const nations: readonly Nation[] = [
  "Mondstadt",
  "Liyue",
  "Inazuma",
  "Outlander",
  "Unknown",
] as const;
const rarities: readonly Rarity[] = [4, 5] as const;

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
        attrData={rarities}
        category="rarity"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={nations}
        category="nation"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
    </div>
  );
};

type Attribute = Vision | Weapon | Nation | Rarity;

type FilterContainerProps = React.FC<{
  attrData: Readonly<Attribute[]>;
  category: keyof Attributes;
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}>;

const FilterContainer: FilterContainerProps = ({
  attrData,
  category,
  attrFilter,
  setAttrFilter,
}) => {
  const handleFilter = (attr: Attribute) => {
    const newSet = new Set<Attribute>(attrFilter[category]);

    newSet.has(attr) ? newSet.delete(attr) : newSet.add(attr);

    setAttrFilter({ ...attrFilter, [category]: newSet });
  };

  return (
    <div className="flex gap-2 rounded-lg bg-slate-300 p-1">
      {attrData.map((attr) => (
        <button
          key={attr}
          onClick={() => handleFilter(attr)}
          className={`cursor-pointer rounded-md p-1 px-2 hover:bg-blue-50 ${
            (attrFilter[category] as Set<Attribute>).has(attr)
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
