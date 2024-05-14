"use client";

import * as React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonSizeClassNames } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";

export interface SelectOption<T> {
  readonly label: React.ReactNode;
  readonly value: T;
}

const Select = React.forwardRef<
  React.ElementRef<typeof Listbox>,
  React.ComponentPropsWithoutRef<typeof Listbox> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => (
  <Listbox ref={ref} {...props}>
    <div className={cn("relative", className)}>{children}</div>
  </Listbox>
));
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    truncate?: boolean;
  }
>(({ className, truncate = false, children, ...props }, ref) => (
  <ListboxButton
    ref={ref}
    as={Button}
    className={cn(
      "w-full justify-between truncate data-[open]:shadow-inner data-[open]:ring-3",
      className,
    )}
    {...props}
  >
    <span
      className={cn(
        "w-full items-center text-left",
        truncate
          ? "inline-block truncate"
          : "flex overflow-hidden whitespace-nowrap",
      )}
    >
      {children}
    </span>
    <Icons.dropdown className="size-7" />
  </ListboxButton>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef<
  React.ElementRef<typeof ListboxOptions>,
  React.ComponentPropsWithoutRef<typeof ListboxOptions> & {
    scrollable?: boolean;
  }
>(({ className, scrollable = false, ...props }, ref) => {
  const Comp = scrollable ? ScrollArea : "ul";

  return (
    <Transition
      as={React.Fragment}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <ListboxOptions
        ref={ref}
        as={Comp}
        className={cn(
          "z-50 flex w-full flex-col gap-0.5 overflow-hidden rounded-3xl bg-secondary p-[0.3125rem] text-secondary-foreground shadow-xl ring-1 ring-black/20 focus:outline-none",
          scrollable ? "!absolute max-h-60 pr-3 sm:max-h-80" : "absolute",
          className,
        )}
        {...props}
      />
    </Transition>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  React.ElementRef<typeof ListboxOption>,
  Omit<React.ComponentPropsWithoutRef<typeof ListboxOption>, "children"> & {
    innerClassName?: string;
    checkClassName?: string;
    children?: React.ReactNode;
    size?: keyof typeof buttonSizeClassNames;
  }
>(
  (
    {
      value,
      className,
      innerClassName,
      checkClassName,
      children,
      size = "default",
      ...props
    },
    ref,
  ) => (
    <ListboxOption
      ref={ref}
      value={value}
      className={cn(
        "group flex select-none outline-none",
        buttonSizeClassNames[size],
        "p-0", // reset buttonSizeClassNames padding
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "relative flex size-full items-center justify-between rounded-full px-3 transition-colors duration-75",
          "group-data-[focus]:bg-secondary-hover group-data-[focus]:active:bg-primary group-data-[focus]:active:text-primary-foreground",
          innerClassName,
        )}
      >
        {children}
        <Check
          className={cn(
            "hidden size-6 group-data-[selected]:flex",
            size === "small" && "size-5",
            checkClassName,
          )}
          strokeWidth={4}
        />
      </div>
    </ListboxOption>
  ),
);
SelectItem.displayName = "SelectItem";

export { Select, SelectContent, SelectItem, SelectTrigger };
