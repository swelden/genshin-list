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
const rarities: readonly Rarity[] = ["4", "5"] as const;

const AttributeFilter: React.FC<{
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
  regions: Nation[];
}> = ({ attrFilter, setAttrFilter, regions }) => {
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
        attrData={regions}
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
      {/* TODO: add "Clear" button */}
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
    <div className="bg-select text-select-foreground flex flex-wrap items-center justify-center gap-2 rounded-lg p-1.5 ring-1 ring-black/10">
      {attrData.map((attr) => (
        // TODO: add focus classes
        <button
          key={attr}
          onClick={() => handleFilter(attr)}
          className={`key-focus ring-offset-select cursor-pointer rounded-md px-2 py-1 transition ${
            (attrFilter[category] as Set<Attribute>).has(attr)
              ? "bg-select-active text-select-active-foreground"
              : "hover:bg-select-hover"
          }`}
        >
          {attr === "4" || attr === "5" ? `${attr} ★` : attr}
        </button>
      ))}
    </div>
  );
};

export default AttributeFilter;
