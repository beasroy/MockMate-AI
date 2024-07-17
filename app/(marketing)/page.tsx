import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import Link from "next/link";


const textFont = Poppins({
  subsets:["latin"],
  weight:["100","200","300","400","500","600","700","800","900"],
});

const MarketingPage = () => {

  return (
    <div className="flex items-center justify-center flex-col">
            <div className={cn("flex items-center justify-center flex-col px-4 md:px-0",textFont.className)}>
                <h1 className="text-xl md:text-4xl text-center text-neutral-800 text-bold mb-6">
                MockMate AI: Perfect Practice for Perfect Performance
                </h1>
                {/* <div className=" bg-gradient-to-r from-fuchsia-600 to-pink-500  px-4 p-2 rounded-md pb-4 w-fit text-3xl md:text-5xl text-white">Work Forward </div> */}
            </div>
            <div className={cn("text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto px-4 md:px-0",textFont.className)}>
                Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify.
            </div>
            <Button className="mt-6" size={"lg"} asChild>
                <Link href="/sign-up">
                Get Taskify fro free
                </Link>
            </Button>
        </div>
  
  );
}

export default MarketingPage;
