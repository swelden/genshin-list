import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex flex-col gap-6">
      <div className="min-h-screen">
        <Navbar />
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
