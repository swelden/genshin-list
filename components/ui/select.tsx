"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonSizeClassNames, buttonVariants } from "@/components/ui/button";
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
} from "@/components/ui/scroll-area";
import { Icons } from "@/components/icons";

export interface SelectOption<T> {
  readonly label: React.ReactNode;
  readonly value: T;
}

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    size?: keyof typeof buttonSizeClassNames;
    truncate?: boolean;
  }
>(({ className, size, truncate = false, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      buttonVariants({ variant: "default", size }),
      "w-full justify-between truncate data-[state=open]:shadow-inner data-[state=open]:ring-3",
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
    <span>
      <SelectPrimitive.Icon asChild>
        <Icons.dropdown
          className={cn("size-7", size === "small" && "size-6")}
        />
      </SelectPrimitive.Icon>
    </span>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    scrollable?: boolean;
  }
>(
  (
    { className, scrollable = false, children, position = "popper", ...props },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 overflow-hidden rounded-3xl bg-secondary text-secondary-foreground shadow-xl ring-1 ring-black/20 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        sideOffset={-4}
        {...props}
      >
        <ScrollAreaRoot type="always" className="size-full">
          <SelectPrimitive.Viewport
            asChild
            className={cn(
              "p-[0.3125rem]",
              scrollable && "h-60 pr-3 sm:h-80",
              position === "popper" &&
                "w-full min-w-[var(--radix-select-trigger-width)]",
            )}
          >
            <ScrollAreaViewport style={{ overflowY: undefined }}>
              {children}
            </ScrollAreaViewport>
          </SelectPrimitive.Viewport>
        </ScrollAreaRoot>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    innerClassName?: string;
    checkClassName?: string;
    children?: React.ReactNode;
    size?: keyof typeof buttonSizeClassNames;
  }
>(
  (
    {
      className,
      innerClassName,
      checkClassName,
      children,
      size = "default",
      ...props
    },
    ref,
  ) => (
    <SelectPrimitive.Item
      ref={ref}
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
          "group-data-[highlighted]:bg-secondary-hover group-data-[highlighted]:active:bg-primary group-data-[highlighted]:active:text-primary-foreground",
          innerClassName,
        )}
      >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        <span>
          <SelectPrimitive.ItemIndicator>
            <Check
              className={cn(
                "hidden size-6 group-data-[state=checked]:flex",
                size === "small" && "size-5",
                checkClassName,
              )}
              strokeWidth={4}
            />
          </SelectPrimitive.ItemIndicator>
        </span>
      </div>
    </SelectPrimitive.Item>
  ),
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
};
