"use client";
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import { Logo } from "@/components/logo"
import { usePathname } from "next/navigation"


export const Navbar = ()=>{
    const path = usePathname();

    return(
        <nav className="fixed z-50 h-14 w-full border-b shadow-sm bg-gradient-to-r from-green-200 to-blue-300 flex items-center justify-between top-0">
           
           <div className="md:max-w-screen-xl max-md:px-4 mx-auto flex items-center w-full justify-between">
           <Logo />
           <ul className="flex gap-x-10 text-slate-800 max-md:hidden cursor-pointer">
            <li className={`hover:text-primary hover:font-bold transition-all ${path=="/dashboard" && 'text-blue-800 font-bold'}`}>Dashboard</li>
            <li className="hover:text-primary hover:font-bold transition-all">Questions</li>
            <li className="hover:text-primary hover:font-bold transition-all">Upgrade</li>
            <li className="hover:text-primary hover:font-bold transition-all">How it works?</li>
           </ul>
           
            <UserButton />
            </div>
            
        </nav>
    )

}
