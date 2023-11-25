import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Section: React.FC<{
  children: ReactNode;
  title: string;
  lgPadding?: string;
  className?: string;
}> = ({ children, title, lgPadding = "lg:p-5", className = "" }) => (
  <section
    className={cn(
      "flex flex-col gap-4 bg-white p-5 ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/5 sm:rounded-lg sm:p-4",
      lgPadding,
      className,
    )}
  >
    <h2 className="border-b-2 border-zinc-300/80 pb-2 text-2xl dark:border-zinc-700/80">
      {title}
    </h2>
    {children}
  </section>
);
export default Section;
