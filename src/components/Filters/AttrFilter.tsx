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
const nations: readonly Nation[] = ["Mondstadt", "Liyue", "Inazuma"] as const;
const rarities: readonly Rarity[] = ["4", "5"] as const;

const AttributeFilter: React.FC<{
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}> = ({ attrFilter, setAttrFilter }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2 lg:col-span-2">
      <FilterContainer
        attrData={visions}
        category="element"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={weapons}
        category="weapontype"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={nations}
        category="region"
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
    <div className="flex flex-wrap items-center justify-center gap-1 rounded-lg bg-attr-bg p-1.5 text-attr-text sm:gap-2">
      {attrData.map((attr) => (
        <button
          key={attr}
          onClick={() => handleFilter(attr)}
          className={`cursor-pointer rounded-md p-1 px-2 transition ${
            (attrFilter[category] as Set<Attribute>).has(attr)
              ? "bg-attr-bg-click text-attr-text-click"
              : "hover:bg-attr-hover-bg hover:text-white"
          }`}
        >
          {attr === "4" || attr === "5" ? `${attr} ★` : attr}
        </button>
      ))}
    </div>
  );
};

export default AttributeFilter;
