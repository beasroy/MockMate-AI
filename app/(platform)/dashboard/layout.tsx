import { Footer } from "@/app/(marketing)/_components/footer";
import { Navbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex  items-center mx-5 md:mx-20 lg:mx-32">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
