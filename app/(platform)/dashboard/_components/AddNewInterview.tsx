"use client";
import { Button } from "@/components/ui/button";
import { config } from "dotenv";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { resolve } from "path";
import { chatSession } from "@/utils/GeminiAiModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

config({ path: resolve(__dirname, ".env.local") });

interface Question {
    question: string;
    answer: string;
}

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [jobPosition, setJobPosition] = useState<string | undefined>(undefined);
    const [jobDesc, setJobDesc] = useState<string | undefined>(undefined);
    const [jobExp, setJobExp] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [jsonResp, setJsonResp] = useState<Question[]>([]);
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
    
        const InputPrompt =
            "Job position: " +
            jobPosition +
            ", Job Description: " +
            jobDesc +
            ", Years of experience: " +
            jobExp +
            ", Based on this information please give me " +
            process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
            " interview questions with answers in JSON format.where there will be two fields question and answer.";
    
        try {
            const result = await chatSession.sendMessage(InputPrompt);
            const responseText = await result.response.text();
    
          
    
            if (!responseText) {
                console.error("No response generated from AI");
                setLoading(false);
                return;
            }
    
           
            let cleanText = responseText
                .replace(/```json/, "")  // Remove markdown json code block
                .replace(/```/, "")      // Remove ending code block markers
                .trim();
    
           
    

    
            let parsedJson;
            try {
                parsedJson = JSON.parse(cleanText);  
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError);
                setLoading(false);
                return;
            }
    
            setJsonResp(parsedJson);
    
            const userEmail = user?.primaryEmailAddress?.emailAddress || "default@example.com";
            if (parsedJson) {
                try {
                    const resp = await db
                        .insert(MockInterview)
                        .values({
                            mockId: uuidv4(),
                            jsonMockResp: JSON.stringify(parsedJson),
                            jobPosition: jobPosition!,
                            jobDesc: jobDesc!,
                            jobExperience: jobExp!,
                            createdBy: userEmail,
                            createdAt: moment().format("DD-MM-YYYY"),
                        })
                        .returning({ mockId: MockInterview.mockId });
    
                    console.log("Inserted Mock ID:", resp[0]?.mockId);
                    if (resp) {
                        setOpenDialog(false);
                        router.push("/dashboard/interview/" + resp[0]?.mockId);
                    }
                } catch (error) {
                    console.error("Error inserting data:", error);
                }
            } else {
                console.log("Parsed JSON is empty or invalid");
            }
        } catch (error) {
            console.error("Error processing the response:", error);
        }
    
        setLoading(false);
    };
    

    const handleJobPositionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setJobPosition(event.target.value);
    };

    const handleJobDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setJobDesc(event.target.value);
    };

    const handleJobExpChange = (event: ChangeEvent<HTMLInputElement>) => {
        setJobExp(event.target.value);
    };

    return (
        <div>
            <div
                className="p-10 border-2 rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="text-lg font-extrabold text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-sky-800">
                            Set the Stage: Provide Job Info for Your Mock Interview
                        </DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Let’s get started by sharing the job role, description, and years of experience needed</h2>
                                    <div className="mt-7 mb-4">
                                        <label className="text-black font-semibold">Job Role/Position</label>
                                        <Input
                                            placeholder="Ex. Full Stack Developer"
                                            className="mt-1"
                                            required
                                            onChange={handleJobPositionChange}
                                        />
                                    </div>
                                    <div className="my-4">
                                        <label className="text-black font-semibold">Job Description / Tech Stack (In short)</label>
                                        <Textarea
                                            placeholder="Ex. React, Next, PostgreSQL, Tailwind "
                                            className="mt-1"
                                            required
                                            onChange={handleJobDescChange}
                                        />
                                    </div>
                                    <div className="my-4">
                                        <label className="text-black font-semibold">Years of Experience</label>
                                        <Input
                                            placeholder="Ex. 5"
                                            type="number"
                                            className="mt-1"
                                            max={50}
                                            required
                                            onChange={handleJobExpChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant={"ghost"} onClick={() => setOpenDialog(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ? (
                                            <>
                                                <LoaderCircle className="animate-spin mr-1" />
                                                Generate from AI
                                            </>
                                        ) : (
                                            "Start Interview"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddNewInterview;
