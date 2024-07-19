import { Navbar } from "./_components/navbar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full bg-slate-100">
            <Navbar />
            <div className="relative pt-20 md:pt-14 mx-5 md:mx-20 lg:mx-28">
                {children}
            </div>
        </div>
    )
}
export default DashboardLayout;