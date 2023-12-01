import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <nav className="z-50 mb-4 w-full py-5">
      <div className="container flex items-center justify-between">
        <Link
          href="/"
          className="rounded p-2 text-2xl font-semibold"
          aria-label="Genshin List Home"
        >
          Genshin List
        </Link>
        {/* NOTE: might make links for filtering different categories (characters, artifacts, weapons, etc.) */}
        <ThemeToggle />
      </div>
    </nav>
  );
}
