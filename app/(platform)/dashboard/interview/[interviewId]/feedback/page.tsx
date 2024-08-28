'use client'
import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { db } from "@/utils/db";
import { UserAnswers } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface InterviewProps {
  params: {
    interviewId: string;
  };
}

interface InterviewFeedback {
  id: number;
  createdAt: string | null;
  mockIdRef: string;
  question: string;
  correctAns: string;
  userAns: string | null;
  feedback: string | null;
  rating: string | null;
  userEmail: string | null;
}

function Feedback({ params }: InterviewProps) {
  const [feedbackList, setFeedbackList] = useState<InterviewFeedback[]>([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [confettiDimensions, setConfettiDimensions] = useState({ width: 0, height: 0 });
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  useEffect(() => {
    
    setConfettiDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswers)
      .where(eq(UserAnswers.mockIdRef, params.interviewId))
      .orderBy(UserAnswers.id);

    setFeedbackList(result);
  };

  return (
    <div className="relative min-h-screen p-8 md:p-10">
      
      {showConfetti && feedbackList.length>0 && (
        <div className="fixed inset-0 z-50">
          <Confetti width={confettiDimensions.width} height={confettiDimensions.height} />
        </div>
      )}

      {feedbackList.length==0 ?<h2 className="font-bold text-xl mt-10"> No interview feedback record found.</h2>:<>
      
        <h2 className="text-2xl md:text-3xl font-bold text-green-500 mt-10">
        Kudos to You! 🎉
      </h2>
      <h2 className="text-base md:text-xl font-bold my-3">
        Here's Your Personalized Interview Insight
      </h2>
      <h2 className="text-base md:text-lg font-bold my-3 text-primary">
        Your Overall Interview Score: <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-gray-700">
        Dive into the details below: You'll find the interview questions, the
        ideal responses, your answers, and tips to help you level up!
      </h2>

      {feedbackList &&
        feedbackList.map((item, index) => (
          <Collapsible key={index} className="mt-7">
            <CollapsibleTrigger className="p-3 my-4 text-left rounded-lg border-2 bg-slate-100 flex justify-between gap-7 w-full">
              {item.question}
              <ChevronsUpDown className="w-5 h-5" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2
                  className={`p-2 border rounded-lg ${
                    Number(item?.rating) > 3 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <strong>Rating: </strong>
                  {item.rating}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                  <strong>Your Answer: </strong>
                  {item.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                  <strong>Correct Answer: </strong>
                  {item.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                  <strong>Feedback: </strong>
                  {item.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
        </>}
        <Button className="mt-5" onClick={()=>router.push("/dashboard")}>Go to Dashboard</Button>
    </div>
  );
}

export default Feedback;
