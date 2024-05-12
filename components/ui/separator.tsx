"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import { IconImage } from "@/components/ui/icon-image";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  Omit<
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>,
    "children"
  > & {
    invert?: boolean;
    lineClassName?: string;
  }
>(
  (
    {
      className,
      lineClassName,
      orientation = "horizontal",
      decorative = true,
      invert = false,
      ...props
    },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "flex shrink-0 flex-nowrap items-center justify-center",
        orientation === "horizontal" ? "h-min" : "w-min flex-col",
        className,
      )}
      {...props}
    >
      <DecorativeEndpoint
        src="/images/arrow-left.png"
        orientation={orientation}
        invert={invert}
      />
      <div
        className={cn(
          "bg-border",
          orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
          lineClassName,
        )}
      />
      <DecorativeEndpoint
        src="/images/arrow-right.png"
        orientation={orientation}
        invert={invert}
      />
    </SeparatorPrimitive.Root>
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

function DecorativeEndpoint({
  src,
  orientation,
  invert,
}: {
  src: string;
  orientation: "horizontal" | "vertical";
  invert: boolean;
}) {
  return (
    <IconImage
      className={cn(
        "pointer-events-none h-[0.5625rem] w-[1.1875rem] select-none",
        orientation === "vertical" && "rotate-90",
      )}
      src={src}
      alt=""
      invert={invert}
    />
  );
}

export { Separator };
