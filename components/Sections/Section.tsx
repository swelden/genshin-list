import { ReactNode } from "react";

const Section: React.FC<{
  children: ReactNode;
  title: string;
  lgPadding?: string;
  className?: string;
}> = ({ children, title, lgPadding = "lg:p-5", className = "" }) => (
  <section
    className={`flex flex-col gap-3 rounded-lg bg-white p-4 ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/5 ${lgPadding} ${className}`}
  >
    <h2 className="text-2xl">{title}</h2>
    {children}
  </section>
);
export default Section;
