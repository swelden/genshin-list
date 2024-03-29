import Link from "next/link";

import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <nav className="z-50 mb-4 w-full py-5">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="rounded p-2 text-2xl font-semibold sm:text-3xl"
          aria-label={`${siteConfig.name} Home`}
        >
          {siteConfig.name}
        </Link>
        {/* NOTE: might make links for filtering different categories (characters, artifacts, weapons, etc.) */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
