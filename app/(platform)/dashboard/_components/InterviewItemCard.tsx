'use client';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface InterviewLists{
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string | null;
    mockId: string;
}

interface InterviewItemCardProps {
    interview: InterviewLists; 
  }

const InterviewItemCard = ({interview}:InterviewItemCardProps) => {

    const router = useRouter();

    const onStart =()=>{
        router.push("/dashboard/interview/"+interview.mockId)
    }

    const onFeedback =()=>{
        router.push("/dashboard/interview/"+interview.mockId+"/feedback")
    }
  return (
    <div className="border shadow-md rounded-lg p-3 cursor-pointer bg-zinc-50">
        <h2 className="font-bold text-primary text-xl">{interview?.jobPosition}</h2>
        <h2 className="text-base text-gray-800 mt-1">{interview?.jobDesc}</h2>
        <h2 className="text-sm text-gray-500 mt-3">{interview?.jobExperience} Years of Experience</h2>
        <h2 className="text-xs mt-5">Created At: {interview.createdAt}</h2>
        <div className="flex justify-between mt-4 gap-10">
            <Button size="sm" variant="outline" className="w-full" onClick={onFeedback}> Feedback</Button>
            <Button size="sm" className="w-full" onClick={onStart}>Start Interview</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard