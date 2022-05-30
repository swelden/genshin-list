import "../styles/globals.css";
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
      </Head>
      <Script src="/noflash.js" strategy="beforeInteractive" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
