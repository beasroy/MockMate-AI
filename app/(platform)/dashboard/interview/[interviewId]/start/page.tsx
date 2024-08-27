'use client';
import { useEffect, useState } from 'react'
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Question from './_components/Question';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const RecordAnswer =dynamic(() => import('./_components/RecordAnswer'), { ssr: false });

interface InterviewProps {
    params: {
        interviewId: string;
    };
}

interface Questions {
    question:string,
    answer:string
}

const startInterview = ({params}:InterviewProps) => {

    const [interviewData, setInterviewData] = useState<any>(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState<Questions[]>([]);
    const[activeQuestionIndex,setActiveQuestionIndex]= useState(0);

    useEffect(()=>{
        GetInterviewDetails();
    },[])



    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            if (result.length > 0) {
              const jsonMockResp = JSON.parse(result[0].jsonMockResp);
              console.log(jsonMockResp);
              setMockInterviewQuestion(jsonMockResp);
              setInterviewData(result[0]);
            } else {
                console.log('No interview data found for this ID');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };
  return  mockInterviewQuestion &&(
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 md:my-8'>
 
            {/* QUESTION*/}
             <Question 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}/>  

            {/* VIDEO/AUDIO RECORDING */}
       <RecordAnswer 
       mockInterviewQuestion={mockInterviewQuestion}
       activeQuestionIndex={activeQuestionIndex}
       interviewData={interviewData}/>

        </div>
        <div className='flex flex-col items-center  md:flex-row justify-center md:justify-end gap-4 mt-4 mb-6'>
             
                    {activeQuestionIndex > 0 &&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
                    {activeQuestionIndex !== mockInterviewQuestion?.length-1 &&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        
                {activeQuestionIndex== mockInterviewQuestion?.length-1 &&
                <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button className="md:order-2 bg-green-600">End Interview</Button>
                </Link> }
            </div>

    </div>
  )
}

export default startInterview