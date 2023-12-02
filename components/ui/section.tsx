import * as React from "react";

import { cn } from "@/lib/utils";

function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 bg-section p-5 text-section-foreground sm:rounded-lg sm:border sm:p-4 sm:shadow lg:p-5",
        className,
      )}
      {...props}
    />
  );
}

function SectionHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("border-b-2 pb-2 text-2xl", className)} {...props} />
  );
}

// NOTE: might create SectionContent component and style SectionHeader outside of section background
//       SectionContent will have Section classNames

export { Section, SectionHeader };
