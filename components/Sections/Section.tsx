import { ReactNode } from "react";

const Section: React.FC<{
  children: ReactNode;
  title: string;
  className?: string;
}> = ({ children, title, className }) => (
  <section
    className={`flex flex-col gap-3 rounded-lg bg-white p-3 ring-1 ring-black/5 dark:bg-zinc-800 dark:ring-white/5 lg:p-5 ${className}`}
  >
    <h2 className="text-2xl">{title}</h2>
    {children}
  </section>
);
export default Section;
