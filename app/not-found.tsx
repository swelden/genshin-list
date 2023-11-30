import { Metadata } from "next";

import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Genshin List - 404",
};

const NotFound = () => {
  return (
    <main className="container flex flex-1 flex-col gap-6">
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-center text-4xl">Page Not Found</h2>
        <LinkButton href="/" className="mt-10 w-3/4 max-w-sm">
          <span className="px-4 text-center">Go Home</span>
        </LinkButton>
      </div>
    </main>
  );
};

export default NotFound;
