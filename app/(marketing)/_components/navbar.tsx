
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const Navbar = () =>{
    return(
        <div className="fixed top-0 w-full h-14 shadow-sm bg-gradient-to-r from-green-200 to-blue-300 flex items-center px-4">
            <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size={"sm"} variant={"outline"} asChild>
                        <Link href={"/sign-in"}>
                        Login
                        </Link>  
                    </Button>
                    <Button size={"sm"} asChild>
                    <Link href={"/sign-up"}>
                        Get Taskify for free
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}