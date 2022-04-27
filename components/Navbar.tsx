import Link from "next/link";
import { MoonIcon } from "./icons";

const Navbar = () => {
  return (
    <nav className="mb-4 w-full py-5">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a
            className="p-2 text-2xl font-semibold"
            aria-label="Genshin List Home"
          >
            Genshin List
          </a>
        </Link>
        {/* NOTE: might make links for filtering different categories (characters, artifacts, weapons, etc.) */}
        <div>
          <button
            className="rounded-full p-2"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            <MoonIcon />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
