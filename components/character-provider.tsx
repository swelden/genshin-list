import { Provider as JotaiProvider } from "jotai";

import { getAllCharacters } from "@/data/retrieve";
import { HydrateCharacterAtoms } from "@/components/hydrate-characters";

interface CharacterProviderProps
  extends React.ComponentProps<typeof JotaiProvider> {}

export function CharacterProvider({
  children,
  ...props
}: CharacterProviderProps) {
  const characters = getAllCharacters();

  return (
    <JotaiProvider {...props}>
      <HydrateCharacterAtoms characters={characters}>
        {children}
      </HydrateCharacterAtoms>
    </JotaiProvider>
  );
}
