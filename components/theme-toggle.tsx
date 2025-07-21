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
      <Sun className="absolute size-6 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <Moon className="size-6 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <span className="sr-only">Toggle theme</span>
    </CircleButton>
  );
}
