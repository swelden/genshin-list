import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genshin List",
  description:
    "Find and filter characters from Genshin Impact. Calculate required materials to level up any character.",
};

export const viewport: Viewport = {};

const genshinFont = localFont({
  src: "../public/fonts/ja-jp.woff2",
  display: "swap",
  variable: "--font-genshin",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning: next-themes adds extra attributes: class, style for light and dark mode
    <html lang="en" className={genshinFont.className} suppressHydrationWarning>
      <body className="bg-zinc-100 dark:bg-zinc-900 dark:text-white">
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
