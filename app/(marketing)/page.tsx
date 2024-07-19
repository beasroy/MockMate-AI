import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const textFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className="relative flex items-center justify-center flex-col px-4 md:px-0">
      <div className={cn("flex items-center justify-center flex-col", textFont.className)}>
        <h1 className="text-xl md:text-4xl text-center text-sky-800 font-bold mb-4">
          MockMate AI: Perfect Practice for Perfect Performance
        </h1>
      </div>
      <div className={cn("text-sm md:text-xl text-slate-500 mt-4 max-w-xs md:max-w-2xl text-center mx-auto px-4 md:px-0", textFont.className)}>
        Experience realistic AI-driven mock interviews and receive instant feedback to perfect your responses and boost your confidence.
      </div>
      <Button className="mt-6" size={"lg"} asChild>
        <Link href="/sign-up">
          Begin Your Prep
        </Link>
      </Button>

      <Image
        src="/interview.jpg"
        alt="Description"
        width={750}
        height={300}
        className="mt-6 rounded-xl shadow-lg border-2 border-blue-500"
      />

    </div>
  );
}

export default MarketingPage;
