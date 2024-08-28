'use client';

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

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

const InterviewList = () => {
    const { user } = useUser();
    const[interviews,setInterviews]=useState<InterviewLists[]>([]);
  
    useEffect(() => {
      
          user && GetInterviewList();
        
      }, [user]);
  
    const GetInterviewList = async () => {
      const email = user?.primaryEmailAddress?.emailAddress || "";
        try {
          const result = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, email))
            .orderBy(desc(MockInterview.id));
          
          console.log(result);
          setInterviews(result);
        } catch (error) {
          console.error("Error fetching interview list:", error);
        }
      
    };
  
    return (
      <div>
        <h2 className="font-bold text-xl">Previous Mock Interview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-md:gap-5 gap-8 mt-6">
            {interviews && interviews.map((interview,index)=>(
                <InterviewItemCard interview={interview} key={index} />
            ))} 
        </div>
      </div>
    );
  }

export default InterviewList;