"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import * as React from "react";

const DropdownMenu = React.forwardRef<
  React.ElementRef<typeof Listbox>,
  React.ComponentPropsWithoutRef<typeof Listbox> & {
    children: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => (
  <Listbox ref={ref} {...props}>
    <div className={cn("relative", className)}>{children}</div>
  </Listbox>
));
DropdownMenu.displayName = "DropdownMenu";

const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, children, ...props }, ref) => (
  <Listbox.Button
    ref={ref}
    as={Button}
    className={cn("w-full justify-between truncate", className)}
    {...props}
  >
    <span className="w-full truncate text-left">{children}</span>
    <Icons.dropdown className="h-7 w-7" />
  </Listbox.Button>
));
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Listbox.Options>,
  React.ComponentPropsWithoutRef<typeof Listbox.Options>
>(({ className, ...props }, ref) => (
  <Transition
    as={React.Fragment}
    enter="transition duration-100 ease-out"
    enterFrom="transform scale-95 opacity-0"
    enterTo="transform scale-100 opacity-100"
    leave="transition duration-75 ease-out"
    leaveFrom="transform scale-100 opacity-100"
    leaveTo="transform scale-95 opacity-0"
  >
    <Listbox.Options
      ref={ref}
      className={cn(
        "absolute z-50 flex w-full flex-col gap-[0.125rem] overflow-hidden rounded-3xl bg-secondary p-[0.3125rem] text-secondary-foreground shadow-xl ring-1 ring-black/20 focus:outline-none",
        className,
      )}
      {...props}
    />
  </Transition>
));
DropdownMenuContent.displayName = "DropdownMenuContent";

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Listbox.Option>,
  React.ComponentPropsWithoutRef<typeof Listbox.Option>
>(({ value, className, ...props }, ref) => (
  <Listbox.Option
    ref={ref}
    value={value}
    className={cn("flex h-11 select-none text-xl outline-none", className)}
    {...props}
  />
));
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
};
