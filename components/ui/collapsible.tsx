"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import type { OmitStrict } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

const CollapsibleWithState = React.forwardRef<
  React.ElementRef<typeof Collapsible>,
  OmitStrict<
    React.ComponentPropsWithoutRef<typeof Collapsible>,
    "open" | "onOpenChange"
  >
>(({ className, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={className}
      ref={ref}
      {...props}
    />
  );
});
CollapsibleWithState.displayName = "CollapsibleWithState";

export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithState,
};
