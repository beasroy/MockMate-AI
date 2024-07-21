"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";


const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [jobPosition, setJobPosition] = useState<string | undefined>(undefined);
    const [jobDesc, setJobDesc] = useState<string | undefined>(undefined);
    const [jobExp, setJobExp] = useState<string | undefined>(undefined);

    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();
        console.log(jobPosition,jobExp,jobDesc)

        const InputPrompt = "Job position:"+jobPosition+", Job Description: "+jobDesc+", Years of experience: "+jobExp+", Based on this information please give me 5 interview questions with answers in Json format, Give questions and answers as field in JSON"
    }
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
            <div className='p-10 border-2 rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
            onClick={()=>setOpenDialog(true)}>
                <h2 className='text-lg font-extrabold text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-sky-800">Set the Stage: Provide Job Info for Your Mock Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                           <div>
                            <h2>Let’s get started by sharing the job role, description, and years of experience needed</h2>
                            <div className="mt-7 mb-4">
                                <label className="text-black font-semibold">Job Role/Position</label>
                                <Input placeholder="Ex. Full Stack Developer" className="mt-1" required 
                                onChange={handleJobPositionChange}/>
                            </div>
                            <div className="my-4">
                                <label className="text-black font-semibold">Job Description / Tech Stack (In short)</label>
                                <Textarea placeholder="Ex. React, Next, PostgreSQL, Tailwind " className="mt-1" required
                                onChange={handleJobDescChange}/>
                            </div>
                            <div className="my-4">
                                <label className="text-black font-semibold">Years of Experience</label>
                                <Input placeholder="Ex. 5" type="number" className="mt-1" max={50} required
                                onChange={handleJobExpChange}/>
                            </div>
                           </div>
                            <div className="flex gap-5 justify-end">
                                <Button type="button" variant={"ghost"} onClick={()=>setOpenDialog(false)}>Cancel</Button> 
                                <Button type="submit">Start Interview</Button> 
                            </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview