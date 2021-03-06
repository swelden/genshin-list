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
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg bg-btn-brown p-1.5 text-card-navy ring-1 ring-black/10 dark:bg-card-navy dark:text-btn-brown">
      {attrData.map((attr) => (
        // TODO: add focus classes
        <button
          key={attr}
          onClick={() => handleFilter(attr)}
          className={`key-focus cursor-pointer rounded-md py-1 px-2 ring-offset-btn-brown transition dark:ring-offset-card-navy ${
            (attrFilter[category] as Set<Attribute>).has(attr)
              ? "bg-card-navy text-btn-brown dark:bg-btn-brown dark:text-card-navy"
              : "hover:bg-sort-light-brown hover:text-btn-navy dark:hover:bg-sort-light-navy dark:hover:text-white"
          }`}
        >
          {attr === "4" || attr === "5" ? `${attr} ???` : attr}
        </button>
      ))}
    </div>
  );
};

export default AttributeFilter;
