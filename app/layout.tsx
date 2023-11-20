import type { Metadata, Viewport } from "next";
import Layout from "../src/components/Layout";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genshin List",
  description:
    "Find and filter characters from Genshin Impact. Calculate required materials to level up any character.",
};

export const viewport: Viewport = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-100 dark:bg-zinc-900 dark:text-white">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
