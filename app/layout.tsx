import Layout from "@/components/layout";
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

// TODO: add next-themes for dark mode
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={genshinFont.className}>
      <body className="bg-zinc-100 dark:bg-zinc-900 dark:text-white">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
