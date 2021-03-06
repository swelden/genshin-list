import "../styles/globals.css";
import "../styles/fonts.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/Layout";

// https://stackoverflow.com/questions/71277655/prevent-page-flash-in-next-js-12-with-tailwind-css-class-based-dark-mode
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <Script src="/noflash.js" strategy="beforeInteractive" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
