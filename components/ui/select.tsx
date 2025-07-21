"use client";

import * as React from "react";
import {
  useSelect,
  type UseSelectGetLabelPropsReturnValue,
  type UseSelectGetMenuReturnValue,
  type UseSelectGetToggleButtonReturnValue,
  type UseSelectPropGetters,
} from "downshift";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonSizeClassNames } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";

type SelectValue = string | number;

export interface SelectOption<TValue extends SelectValue> {
  readonly label: React.ReactNode;
  readonly value: TValue;
}

function Select<TValue extends SelectValue>({
  items,
  selectedItem,
  setSelectedItem,
  scrollable = false,
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectContextProvider<TValue>> & {
  className?: string;
  scrollable?: boolean;
}) {
  return (
    <SelectContextProvider
      items={items}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      {...props}
    >
      <div className={cn("relative", className)}>
        {children}
        <SelectContent scrollable={scrollable} />
      </div>
    </SelectContextProvider>
  );
}

function SelectTrigger({
  label,
  className,
  truncate = false,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  label: string;
  truncate?: boolean;
}) {
  const { isOpen, toggleButtonProps, labelProps, size } = useSelectContext();

  return (
    <>
      <label {...labelProps} className="sr-only">
        {label}
      </label>
      <Button
        size={size}
        className={cn(
          "w-full justify-between truncate",
          isOpen && "shadow-inner ring-3",
          className,
        )}
        {...toggleButtonProps}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none items-center text-left",
            truncate
              ? "inline-block truncate"
              : "flex overflow-hidden whitespace-nowrap",
          )}
        >
          {children}
        </span>
        <Icons.dropdown
          className={cn("size-7", size === "small" && "size-6")}
          aria-hidden
        />
      </Button>
    </>
  );
}

function SelectContent({
  scrollable = false,
  ...props
}: React.ComponentProps<typeof ScrollArea> & {
  scrollable?: boolean;
}) {
  const { items, isOpen, menuProps } = useSelectContext();

  return (
    <ScrollArea
      {...menuProps}
      className={cn(
        "bg-secondary text-secondary-foreground absolute! z-50 flex w-full flex-col overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/20 focus:outline-none",
        isOpen
          ? "animate-in fade-in-80 zoom-in-95 slide-in-from-top-2 translate-y-0"
          : "animate-out hidden", // NOTE: hidden is very important
      )}
      viewportClassName={cn(
        "p-1.25",
        scrollable && "max-h-60 pr-3 sm:max-h-80",
      )}
      {...props}
    >
      {isOpen &&
        items.map((item, index) => (
          <SelectItem key={item.value} item={item} index={index} />
        ))}
    </ScrollArea>
  );
}

function SelectItem<TValue extends SelectValue>({
  item,
  index,
  ...props
}: React.ComponentProps<"div"> & {
  item: SelectOption<TValue>;
  index: number;
}) {
  const { highlightedIndex, size, selectedItem, getItemProps } =
    useSelectContext();
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem === item;

  return (
    <div
      {...getItemProps({ item, index })}
      className={cn(
        "flex outline-none select-none",
        buttonSizeClassNames[size ?? "default"],
        "p-0", // reset padding
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex size-full items-center justify-between rounded-full px-3 transition-colors duration-75",
          isHighlighted &&
            "bg-secondary-hover active:bg-primary active:text-primary-foreground",
        )}
      >
        <span className="flex items-center">{item.label}</span>
        <Check
          className={cn(
            "size-6",
            size === "small" && "size-5",
            isSelected === false && "hidden",
          )}
          strokeWidth={4}
          aria-hidden
        />
      </div>
    </div>
  );
}

interface SelectContextType<TValue extends SelectValue> {
  items: SelectOption<TValue>[];
  isOpen: boolean;
  selectedItem: SelectOption<TValue>;
  highlightedIndex: number;
  toggleButtonProps: UseSelectGetToggleButtonReturnValue;
  menuProps: UseSelectGetMenuReturnValue;
  labelProps: UseSelectGetLabelPropsReturnValue;
  getItemProps: UseSelectPropGetters<SelectOption<TValue>>["getItemProps"];
  size?: keyof typeof buttonSizeClassNames;
}

const SelectContext = createSelectContext();

interface SelectContextProviderProps<TValue extends SelectValue> {
  items: SelectOption<TValue>[];
  selectedItem: SelectOption<TValue>;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectOption<TValue>>>;
  size?: keyof typeof buttonSizeClassNames;
  children: React.ReactNode;
}

function SelectContextProvider<TValue extends SelectValue>({
  children,
  items,
  selectedItem,
  setSelectedItem,
  size,
}: SelectContextProviderProps<TValue>) {
  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getLabelProps,
    getItemProps,
  } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      if (newSelectedItem) {
        setSelectedItem(newSelectedItem);
      }
    },
  });

  return (
    <SelectContext.Provider
      value={{
        items,
        isOpen,
        selectedItem,
        highlightedIndex,
        toggleButtonProps: getToggleButtonProps(),
        menuProps: getMenuProps(),
        labelProps: getLabelProps(),
        getItemProps,
        size,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

function useSelectContext() {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(
      "useSelectContext must be used within a SelectContextProvider",
    );
  }
  return context;
}

function createSelectContext<TValue extends SelectValue>() {
  return React.createContext<SelectContextType<TValue> | null>(null);
}

export { Select, SelectTrigger };
