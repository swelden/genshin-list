"use client";

import { useSetIsReversed } from "@/hooks/use-characters";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface ReverseBtnProps {
  className?: string;
}

export function ReverseBtn({ className }: ReverseBtnProps) {
  const setIsReversed = useSetIsReversed();
  return (
    <Button
      onClick={() => setIsReversed((prev) => !prev)}
      aria-label="Reverse"
      className={className}
      size="icon"
    >
      <Icons.reverse className="h-7 w-7" />
      <span className="sr-only">Reverse</span>
    </Button>
  );
}
