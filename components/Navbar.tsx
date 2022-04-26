import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="absolute w-full py-5">
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
          <span className="font-medium">Characters</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
