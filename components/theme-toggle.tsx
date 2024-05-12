"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { CircleButton } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <CircleButton onClick={toggleTheme}>
      <Sun className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Moon className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <span className="sr-only">Toggle theme</span>
    </CircleButton>
  );
}
