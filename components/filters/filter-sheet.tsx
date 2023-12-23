import {
  CHARACTER_RARITIES,
  ELEMENTS,
  REGIONS,
  WEAPONS,
} from "@/data/constants";
import type { FilterAttribute, FilterAttributes } from "@/data/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterButton } from "@/components/filters/filter-button";
import { SelectedFilters } from "@/components/filters/selected-filters";
import { Icons } from "@/components/icons";

interface FilterSheetProps {}

// TODO: add  more mobile styles
export function FilterSheet({}: FilterSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <Icons.filter className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col bg-sheet/90 bg-gradient-to-b from-sheet from-60% p-0 px-1"
        side="leftBottom"
      >
        <div className="flex h-full flex-col border-x-2 border-sheet-border">
          <SheetHeader className="px-4 pt-8 md:px-7">
            <SheetTitle className="border-b-2 border-sheet-border pb-6 text-left text-2xl text-[#D3BC8E]">
              Filter
            </SheetTitle>
          </SheetHeader>

          <ScrollArea thumbClassName="bg-genshin-brown/80 border-genshin-brown/80">
            <div className="mt-8 flex h-full flex-col gap-8 px-4 pb-28 md:px-7">
              <FilterContainer attrData={ELEMENTS} category="element" />
              <FilterContainer attrData={WEAPONS} category="weapon" />
              <FilterContainer attrData={REGIONS} category="region" />
              <FilterContainer
                attrData={CHARACTER_RARITIES}
                category="rarity"
              />
            </div>
          </ScrollArea>

          <SheetFooter className="mt-auto flex-col px-4 pt-4 sm:flex-col sm:space-x-0 md:px-7">
            <SelectedFilters className="mb-7" />
            <SheetClose asChild>
              {/* TODO: add disabled prop */}
              <Button
                className="mb-7 h-14 w-full md:h-16"
                variant="brown"
                size="big"
              >
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
  attrData: Readonly<FilterAttribute[]>;
  category: keyof FilterAttributes;
}

function FilterContainer({ attrData, category }: FilterContainerProps) {
  return (
    <div>
      <span className="text-xl capitalize text-[#BBB9B2] md:text-2xl">
        {category}
      </span>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {attrData.map((attr) => (
          <FilterButton key={attr} attr={attr} category={category} />
        ))}
      </div>
    </div>
  );
}
