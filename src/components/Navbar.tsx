import Link from "next/link";
import { useEffect, useState } from "react";
import useDarkMode from "../hooks/useDarkMode";
import { CircleButton } from "./Button";
import { MoonIcon, SunIcon } from "./icons";

const Navbar = () => {
  const { isDarkMode, toggle } = useDarkMode();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // to prevent isDarkMode differing on the server and the client
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const htmlClass = document.documentElement.classList;
    isDarkMode ? htmlClass.add("dark") : htmlClass.remove("dark");
  }, [isDarkMode]);

  // console.log(isDarkMode);

  return (
    <nav className="z-50 mb-4 w-full py-5">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <a
            className="key-focus key-focus-body rounded p-2 text-2xl font-semibold"
            aria-label="Genshin List Home"
          >
            Genshin List
          </a>
        </Link>
        {/* NOTE: might make links for filtering different categories (characters, artifacts, weapons, etc.) */}
        <CircleButton onClick={toggle} ariaLabel="Theme">
          {/* BUG: there is still a flash of the MoonIcon on initial load */}
          {isLoaded && isDarkMode ? <SunIcon /> : <MoonIcon />}
        </CircleButton>
      </div>
    </nav>
  );
};

export default Navbar;
