import type { NextPage } from "next";
import Head from "next/head";
import { LinkButton } from "../components/Button";

const NotFound: NextPage = () => {
  return (
    <main className="container flex flex-1 flex-col gap-6">
      <Head>
        <title>Genshin List - 404</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact. Calculate required materials to level up any character."
        />
      </Head>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-center text-4xl">Page Not Found</h2>
        <LinkButton url="/" className="mt-10 w-3/4 max-w-sm">
          <span className="px-4 text-center">Go Home</span>
        </LinkButton>
      </div>
    </main>
  );
};

export default NotFound;
