import { siteConfig } from "@/data/site";

export const Footer = () => {
  return (
    <footer className="text-foreground/90 container mt-auto flex flex-col items-center justify-center gap-2 px-4 py-6 text-center text-sm">
      <p className="">
        <strong>Genshin List</strong> is not affiliated with or endorsed by
        HoYoverse.
      </p>
      <p>
        Designed & Developed by <br className="sm:hidden" />
        swelden -{" "}
        <a
          href={siteConfig.links.github}
          rel="noopener noreferrer"
          target="_blank"
          className="rounded text-blue-500 underline dark:text-blue-600"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};
