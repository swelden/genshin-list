"use client";

import * as React from "react";
import {
  useSelect,
  type UseSelectGetMenuReturnValue,
  type UseSelectGetToggleButtonReturnValue,
  type UseSelectPropGetters,
} from "downshift";

import { cn } from "@/lib/utils";
import type { SelectOption } from "@/components/ui/select";

function Select<Item>({
  items,
  selectedItem,
  setSelectedItem,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectContextProvider<Item>> & {
  className?: string;
}) {
  return (
    <SelectContextProvider
      items={items}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      {...props}
    >
      <div className={cn("relative", className)}>{children}</div>
    </SelectContextProvider>
  );
}

function SelectTrigger() {
  const { toggleButtonProps, selectedItem } = useSelectContext();
  return <button {...toggleButtonProps}>{selectedItem.label}</button>;
}

function SelectContent() {
  const { items, isOpen, menuProps } = useSelectContext();

  return (
    <ul {...menuProps} className="absolute z-50">
      {isOpen &&
        items.map((item, index) => (
          <SelectItem key={`${item.value}`} item={item} index={index} />
        ))}
    </ul>
  );
}

function SelectItem<Item>({
  item,
  index,
}: {
  item: SelectOption<Item>;
  index: number;
}) {
  const { highlightedIndex, getItemProps } = useSelectContext();

  return (
    <li
      style={highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}}
      {...getItemProps({ item, index })}
    >
      {item.label}
    </li>
  );
}

interface SelectContextType<Item> {
  items: SelectOption<Item>[];
  isOpen: boolean;
  selectedItem: SelectOption<Item>;
  highlightedIndex: number;
  toggleButtonProps: UseSelectGetToggleButtonReturnValue;
  menuProps: UseSelectGetMenuReturnValue;
  getItemProps: UseSelectPropGetters<Item>["getItemProps"];
}

const SelectContext = createSelectContext();

interface SelectContextProviderProps<Item> {
  items: SelectOption<Item>[];
  selectedItem: SelectOption<Item>;
  setSelectedItem: React.Dispatch<React.SetStateAction<SelectOption<Item>>>;
  children: React.ReactNode;
}

function SelectContextProvider<Item>({
  children,
  items,
  selectedItem,
  setSelectedItem,
}: SelectContextProviderProps<Item>) {
  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items,
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) =>
      setSelectedItem(newSelectedItem),
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
        getItemProps,
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

function createSelectContext<Item>() {
  return React.createContext<SelectContextType<Item> | null>(null);
}

export { Select, SelectTrigger, SelectContent };
