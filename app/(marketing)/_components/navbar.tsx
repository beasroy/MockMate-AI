
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";

export const Navbar = () =>{
    return(
        <div className="fixed top-0 z-10 w-full h-14 shadow-sm bg-gradient-to-r from-green-200 to-blue-300 flex items-center px-4">
            <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
            <Logo />
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size={"sm"} variant={"outline"} asChild>
                        <Link href={"/sign-in"}>
                        Login
                        </Link>  
                    </Button>
                    <Button size={"sm"} asChild>
                    <Link href={"/sign-up"}>
                    Begin Your Prep
                        </Link>
                    </Button>
                  
                </div>
            </div>
        </div>
    );
}

