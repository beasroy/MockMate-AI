import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";


const MarketingLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Navbar />
            <main className="pt-28 md:pt-40 pb-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}
export default MarketingLayout;