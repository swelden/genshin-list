// https://usehooks-ts.com/react-hook/use-dark-mode

import useLocalStorage from "@/hooks/use-local-storage";
import useMediaQuery from "@/hooks/use-media-query";
import useUpdateEffect from "@/hooks/use-update-effect";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
  isDarkMode: boolean;
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    "dark-mode",
    defaultValue ?? isDarkOS ?? false,
  );

  // Update darkMode if os prefers changes
  useUpdateEffect(() => {
    setDarkMode(isDarkOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkOS]);

  return {
    isDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
}

export default useDarkMode;
