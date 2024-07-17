
import { Button } from "@/components/ui/button";


export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full  border-t bg-slate-100 p-4">
            <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-center">
                <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
                    <Button size={"sm"} variant={"ghost"}>
                        Privacy Policy
                    </Button>
                    <Button size={"sm"} variant={"ghost"}>
                        Terms of service
                    </Button>
                </div>
            </div>
        </div>
    );
}