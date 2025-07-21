"use client";

import * as React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

import type { OmitStrict } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

function CollapsibleWithState({
  className,
  ...props
}: OmitStrict<
  React.ComponentProps<typeof Collapsible>,
  "open" | "onOpenChange"
>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={className}
      {...props}
    />
  );
}

export {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithState,
};
