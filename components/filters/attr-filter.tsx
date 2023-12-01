import { cn } from "@/lib/utils";

// TODO: move visions and weapons to data folder and import them here
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

interface AttributeFilterProps {
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
  regions: Nation[];
}

export function AttributeFilter({
  attrFilter,
  setAttrFilter,
  regions,
}: AttributeFilterProps) {
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
}

type Attribute = Vision | Weapon | Nation | Rarity;

interface FilterContainerProps {
  attrData: Readonly<Attribute[]>;
  category: keyof Attributes;
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}

function FilterContainer({
  attrData,
  category,
  attrFilter,
  setAttrFilter,
}: FilterContainerProps) {
  const handleFilter = (attr: Attribute) => {
    const newSet = new Set<Attribute>(attrFilter[category]);

    newSet.has(attr) ? newSet.delete(attr) : newSet.add(attr);

    setAttrFilter({ ...attrFilter, [category]: newSet });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-lg bg-secondary p-1.5 text-secondary-foreground ring-1 ring-black/10">
      {attrData.map((attr) => (
        // TODO: add focus classes
        <button
          key={attr}
          onClick={() => handleFilter(attr)}
          className={cn(
            "cursor-pointer rounded-md px-2 py-1 ring-offset-secondary transition",
            (attrFilter[category] as Set<Attribute>).has(attr)
              ? "bg-primary text-primary-foreground"
              : "hover:bg-secondary-hover",
          )}
        >
          {attr === "4" || attr === "5" ? `${attr} ★` : attr}
        </button>
      ))}
    </div>
  );
}
