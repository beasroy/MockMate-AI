import { Footer } from "@/app/(marketing)/_components/footer";
import { Navbar } from "./_components/navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-slate-100">
            <Navbar />
            <div className="pt-16 md:pt-14 mx-5 md:mx-20 lg:mx-32">
                {children}
            </div>
            <Footer />
        </div>
    )
}
export default DashboardLayout;