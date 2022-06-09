import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      {/* BUG: transition-colors does not work on linear gradient so removing it for now */}
      <body className="bg-zinc-100 dark:bg-zinc-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
