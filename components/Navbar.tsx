import Link from "next/link";
import { useEffect, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { MoonIcon, SunIcon } from "./icons";

const Navbar = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const htmlClass = document.documentElement.classList;
    isDarkMode ? htmlClass.add("dark") : htmlClass.remove("dark");
  }, [isDarkMode]);

  // console.log(isDarkMode);

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
            onClick={toggle}
            className="rounded-full p-2"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isLoaded && isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
