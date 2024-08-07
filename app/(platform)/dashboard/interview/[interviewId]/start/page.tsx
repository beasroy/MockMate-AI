'use client';
import { useEffect, useState } from 'react'
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import Question from './_components/Question';
import RecordAnswer from './_components/RecordAnswer';

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

            {/* QUESTION */}
             <Question 
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            setActiveQuestionIndex={setActiveQuestionIndex}/> 

            {/* VIDEO/AUDIO RECORDING */}
       <RecordAnswer />

        </div>

    </div>
  )
}

export default startInterview