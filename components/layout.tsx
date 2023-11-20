import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
