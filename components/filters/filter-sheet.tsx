import { Check } from "lucide-react";

import {
  CHARACTER_RARITIES,
  ELEMENTS,
  REGIONS,
  WEAPONS,
} from "@/data/constants";
import type { Attribute, Attributes } from "@/data/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "@/components/icons";

interface FilterSheetProps {
  attrFilter: Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}

export function FilterSheet({ attrFilter, setAttrFilter }: FilterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"}>
          <Icons.filter className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex w-[400px] flex-col bg-sheet/90 bg-gradient-to-b from-sheet from-60% p-0 px-1 sm:w-full sm:max-w-2xl"
        side="left"
      >
        <div className="flex h-full flex-col border-x-2 border-sheet-border">
          <SheetHeader className="px-7 pt-8">
            <SheetTitle className="border-b-2 border-sheet-border pb-6 text-2xl text-[#D3BC8E]">
              Filter
            </SheetTitle>
          </SheetHeader>
          <div className="mt-8 flex h-full flex-col gap-8 overflow-auto px-7 pb-28">
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
          </div>
          <SheetFooter className="mt-auto px-7">
            {/* TODO: add "Clear" button */}
            <SheetClose asChild>
              {/* TODO: if no change in filter then it has a transparent bg */}
              <Button className="my-7 h-16 text-2xl" size="full">
                Confirm Filter
              </Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
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
  return (
    <div>
      <span className="text-2xl capitalize text-[#BBB9B2]">{category}</span>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {attrData.map((attr) => (
          <FilterButton
            key={attr}
            attr={attr}
            attrFilter={attrFilter}
            category={category}
            setAttrFilter={setAttrFilter}
          />
        ))}
      </div>
    </div>
  );
}

interface FilterButtonProps {
  attr: Attribute;
  attrFilter: Attributes;
  category: keyof Attributes;
  setAttrFilter: React.Dispatch<React.SetStateAction<Attributes>>;
}

function FilterButton({
  attr,
  attrFilter,
  category,
  setAttrFilter,
}: FilterButtonProps) {
  const handleFilter = (attr: Attribute) => {
    const newSet = new Set<Attribute>(attrFilter[category]);

    newSet.has(attr) ? newSet.delete(attr) : newSet.add(attr);

    setAttrFilter({ ...attrFilter, [category]: newSet });
  };

  const isSelected = (attrFilter[category] as Set<Attribute>).has(attr);

  return (
    <button
      key={attr}
      onClick={() => handleFilter(attr)}
      className={cn(
        "flex h-16 items-center gap-3 overflow-hidden border-2 border-sheet-btn-border px-3 text-left text-xl text-genshin-brown outline-none ring-offset-secondary transition active:!ring-0 hocus:ring-4 hocus:ring-white",
        isSelected &&
          "border-sheet-btn-border-selected bg-genshin-brown text-genshin-blue ring-2 ring-genshin-brown",
      )}
    >
      {/* need to position absolute to transition border color on circle */}
      <div className="relative aspect-square h-7 w-7">
        <Check
          className={cn(
            "absolute inset-0 h-full w-full text-[#84D71C]",
            !isSelected && "hidden",
          )}
          strokeWidth="3"
        />
        <div
          className={cn(
            "absolute inset-0 h-full w-full rounded-full border-2 border-sheet-btn-border transition-colors",
            isSelected && "h-0 w-0 scale-0 border-genshin-brown",
          )}
        />
      </div>

      {attr === "4" || attr === "5" ? `${attr}-Star` : attr}
    </button>
  );
}
