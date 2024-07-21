import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="absolute max-h-[95vh] inset-0 -z-10 bg-gradient-to-r from-black to-slate-800"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 75%, 0% 100%)',
        }}>
      </div>
      <Navbar />
      <main className="relative pt-28 md:pt-25 pb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MarketingLayout;

