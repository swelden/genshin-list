import {
  CHARACTER_RARITIES,
  ELEMENTS,
  REGIONS,
  WEAPONS,
} from "@/data/constants";
import type { Attribute, Attributes } from "@/data/types";
import { cn } from "@/lib/utils";

interface AttributeFilterProps {
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}

export function AttributeFilter({
  attrFilter,
  setAttrFilter,
}: AttributeFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-2 lg:col-span-2">
      <FilterContainer
        attrData={ELEMENTS}
        category="element"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={WEAPONS}
        category="weapontype"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={REGIONS}
        category="region"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      <FilterContainer
        attrData={CHARACTER_RARITIES}
        category="rarity"
        attrFilter={attrFilter}
        setAttrFilter={setAttrFilter}
      />
      {/* TODO: add "Clear" button */}
    </div>
  );
}

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
