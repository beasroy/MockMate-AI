import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import localFont from "next/font/local"

const headingFont = localFont({
    src:"../public/fonts/BOD_R.woff"
})
export const Logo = () =>{
    return(
        <Link href={"/"}>
        <div className="hover:opacity-75 transition items-center gap-x-2 flex">
                <Image src={"/logo1.png"} alt="logo" width={30} height={30}/>
                <p className={cn("pb-1 text-neutral-700 text-xl",headingFont.className)}>MockMate AI</p>
        </div>
        </Link>
    )
}