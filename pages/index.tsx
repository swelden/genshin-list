import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Results from "../components/Results";
import Sidebar from "../components/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="relative flex flex-col">
      <Head>
        <title>Genshin List</title>
        <meta
          name="description"
          content="Find and filter characters from Genshin Impact"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className="container flex h-screen auto-rows-min grid-cols-[0.3fr_1fr] flex-col gap-6 pt-24 md:grid md:gap-10 md:pt-28">
        <Sidebar />
        <Results />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Home;
