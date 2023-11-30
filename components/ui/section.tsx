import * as React from "react";

import { cn } from "@/lib/utils";

const Section = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <section
    className={cn(
      "bg-section text-section-foreground flex flex-col gap-4 p-5 sm:rounded-lg sm:border sm:p-4 sm:shadow lg:p-5",
      className,
    )}
    {...props}
  />
);
Section.displayName = "Section";

const SectionHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("border-b-2 pb-2 text-2xl", className)} {...props} />
);
SectionHeader.displayName = "SectionHeader";

// NOTE: might create SectionContent component and style SectionHeader outside of section background
//       SectionContent will have Section classNames

export { Section, SectionHeader };
