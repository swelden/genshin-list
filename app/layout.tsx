import type { Metadata, Viewport } from "next";

import { genshinFont } from "@/lib/fonts";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://genshin-list.vercel.app"),
  title: { default: "Genshin List", template: "%s - Genshin List" },
  description:
    "Find and filter characters from Genshin Impact. Calculate required materials to level up any character.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    // suppressHydrationWarning: next-themes adds extra attributes: class, style for light and dark mode
    <html lang="en" className={genshinFont.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex flex-col gap-6">
            <div className="flex min-h-screen flex-col">
              <Navbar />
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
