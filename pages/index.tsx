import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Results from "../components/Results";
import Filters from "../components/Filters";

const Home: NextPage = () => {
  return (
    <div className="relative flex flex-col gap-2">
      <Head>
        <title>Genshin List</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen">
        <Navbar />
        <main className="container flex flex-col gap-6">
          <Filters />
          <Results />
        </main>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Home;
