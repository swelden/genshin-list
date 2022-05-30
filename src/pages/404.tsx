import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

const NotFound: NextPage = () => {
  return (
    <main className="container flex flex-1 flex-col gap-6">
      <Head>
        <title>Genshin List - 404</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-4xl">Page Not Found</h2>
      </div>
    </main>
  );
};

export default NotFound;
