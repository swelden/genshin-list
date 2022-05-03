import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-zinc-50 transition-colors dark:bg-zinc-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
