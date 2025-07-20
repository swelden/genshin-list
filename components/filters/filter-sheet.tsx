"use client";

import * as React from "react";

import {
  CHARACTER_RARITIES,
  ELEMENTS,
  FARMABLE_WEEKDAYS,
  REGIONS,
  WEAPONS,
} from "@/data/constants";
import type { FilterAttribute, FilterAttributes } from "@/data/types";
import { isEqualSets } from "@/lib/utils";
import { useAttrFilter } from "@/hooks/use-characters";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { FilterButton } from "@/components/filters/filter-button";
import { SelectedFilters } from "@/components/filters/selected-filters";
import { Icons } from "@/components/icons";

interface FilterSheetProps {
  className?: string;
}

export function FilterSheet({ className }: FilterSheetProps) {
  const [attrFilter, setAttrFilter] = useAttrFilter();
  const [curFilter, setCurFilter] = React.useState(attrFilter);

  const hasChanged = isEqualFilters(attrFilter, curFilter) === false;

  return (
    <Sheet onOpenChange={() => setCurFilter(attrFilter)}>
      <SheetTrigger asChild>
        <Button size="icon" className={className}>
          <Icons.filter className="size-6" />
          <span className="sr-only">Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        className="flex flex-col bg-sheet/90 bg-linear-to-b from-sheet from-60% p-0 px-1"
        closeClassName="top-2 md:top-4"
        side="leftBottom"
        variant="brown"
      >
        <div className="flex h-full flex-col border-x-2 border-sheet-border">
          <SheetHeader className="px-4 pt-6 md:px-7 md:pt-8">
            <SheetTitle className="text-left text-2xl text-[#D3BC8E]">
              Filter
            </SheetTitle>
            <VisuallyHidden>
              <SheetDescription>
                Filter characters by their attributes.
              </SheetDescription>
            </VisuallyHidden>
            <Separator
              className="my-4 md:mt-6"
              lineClassName="bg-sheet-border"
            />
          </SheetHeader>

          <ScrollArea thumbClassName="bg-genshin-brown/80 border-genshin-brown/80">
            <div className="mt-4 flex h-full flex-col gap-8 px-4 pb-28 md:px-7">
              <FilterContainer
                category="element"
                attrData={ELEMENTS}
                attrFilter={curFilter}
                setAttrFilter={setCurFilter}
              />
              <FilterContainer
                category="weapon"
                attrData={WEAPONS}
                attrFilter={curFilter}
                setAttrFilter={setCurFilter}
              />
              <FilterContainer
                category="region"
                attrData={REGIONS}
                attrFilter={curFilter}
                setAttrFilter={setCurFilter}
              />
              <FilterContainer
                category="weekday"
                attrData={FARMABLE_WEEKDAYS}
                attrFilter={curFilter}
                setAttrFilter={setCurFilter}
              />
              <FilterContainer
                category="rarity"
                attrData={CHARACTER_RARITIES}
                attrFilter={curFilter}
                setAttrFilter={setCurFilter}
              />
            </div>
          </ScrollArea>

          <SheetFooter className="relative mt-auto flex-col px-4 pt-4 sm:flex-col sm:space-x-0 md:px-7 md:pt-6">
            <SelectedFilters
              attrFilter={curFilter}
              setAttrFilter={setCurFilter}
              className="absolute inset-0 -top-9 mx-4 md:mx-7"
              transparent
            />
            <SheetClose asChild>
              <Button
                onClick={() => {
                  setAttrFilter(curFilter);
                }}
                className="mb-7 h-14 w-full md:h-16"
                variant="brown"
                size="big"
                disabled={!hasChanged}
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
  category: keyof FilterAttributes;
  attrData: Readonly<FilterAttribute[]>;
  attrFilter: FilterAttributes;
  setAttrFilter: (attrFilter: FilterAttributes) => void;
}

function FilterContainer({
  category,
  attrData,
  attrFilter,
  setAttrFilter,
}: FilterContainerProps) {
  return (
    <div>
      <span className="text-xl capitalize text-[#BBB9B2] md:text-2xl">
        {category}
      </span>
      <div className="mt-5 grid grid-cols-3 gap-3">
        {attrData.map((attr) => (
          <FilterButton
            key={attr}
            attr={attr}
            category={category}
            attrFilter={attrFilter}
            setAttrFilter={setAttrFilter}
          />
        ))}
      </div>
    </div>
  );
}

function isEqualFilters(
  aFilters: FilterAttributes,
  bFilters: FilterAttributes,
) {
  const filterKeys = Object.keys(aFilters) as (keyof FilterAttributes)[];
  return filterKeys.every((key) => isEqualSets(aFilters[key], bFilters[key]));
}
