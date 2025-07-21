import * as React from "react";

import { cn } from "@/lib/utils";

function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn(
        "bg-section text-section-foreground flex flex-col p-4 sm:rounded-lg sm:border sm:p-5 sm:shadow",
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
  return <h2 className={cn("text-2xl", className)} {...props} />;
}

function SectionContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-4", className)} {...props} />;
}

export { Section, SectionHeader, SectionContent };
