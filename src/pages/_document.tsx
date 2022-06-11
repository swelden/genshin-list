import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/ja-jp.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      {/* BUG: transition-colors does not work on linear gradient so removing it for now */}
      <body className="bg-zinc-100 dark:bg-zinc-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
