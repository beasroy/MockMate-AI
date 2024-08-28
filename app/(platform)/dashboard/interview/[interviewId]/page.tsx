'use client';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Webcam from 'react-webcam';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {config} from "dotenv";
import { resolve } from "path";
import Link from 'next/link';

config({ path: resolve(__dirname, ".env.local") });

interface InterviewProps {
    params: {
        interviewId: string;
    };
}

const Interview = ({ params }: InterviewProps) => {
    const [interviewData, setInterviewData] = useState<any>(null);
    const [webcamEnabled, setWebcamEnabled] = useState<boolean>(false);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        try {
            const result = await db
                .select()
                .from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId));

            if (result.length > 0) {
                setInterviewData(result[0]);
            } else {
                console.log('No interview data found for this ID');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };

    return (
        <div className="p-4 md:p-10">
            <h2 className="text-2xl font-bold">Let's Get Started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 my-3'>
            <div className="order-2 md:order-1">
            {interviewData && (
                <div className="flex flex-col my-3 md:my-5 gap-4">
                    <div className='bg-white rounded-lg flex flex-col gap-2 border p-5'>
                    <h2 className="text-base">
                        <strong>Job Role/Position: </strong>{interviewData.jobPosition}
                    </h2>
                    <h2 className="text-base">
                        <strong>Job Description: </strong>{interviewData.jobDesc}
                    </h2>
                    <h2 className="text-base">
                        <strong>Years of Experience: </strong>{interviewData.jobExperience}
                    </h2>
                    </div>
                    <div className='p-5 border rounded-lg bg-yellow-100  border-yellow-300'>
                        <h2 className='flex items-center gap-2 text-yellow-500 text-lg'><Lightbulb /><strong>Information</strong></h2>
                        <p className='text-base mt-2 text-amber-800'>{process.env.NEXT_PUBLIC_INFORMATION}</p>
                    </div>
                </div>
            )}
            </div>
            <div className="order-1 md:order-2">
                {webcamEnabled ? (
                    <>
                    <Webcam
                        style={{ width: "100%", height: 310 ,justifyContent: "center"}}
                        onUserMediaError={() => setWebcamEnabled(false)}
                        onUserMedia={() => setWebcamEnabled(true)}
                        mirrored={true}
                        className='md:mt-5'
                        
                    />
                    <Button variant="ghost" onClick={() => setWebcamEnabled(false)} className='w-full text-center mt-5'>Disable webcam and microphone</Button>
                    </>
                ) : (
                    <>
                        <WebcamIcon className="h-48 md:h-72 w-full bg-slate-50 my-4 p-16 md:p-20 rounded-xl border-2" />
                        <Button variant="ghost" onClick={() => setWebcamEnabled(true)} className='w-full text-center'>Enable webcam and microphone</Button>
                    </>
                )}
            </div>
            
            </div>
           <div className='flex justify-center'>
            <Link href={"/dashboard/interview/"+params.interviewId+"/start"}>
            <Button>Start Interview</Button>
            </Link>
           </div>
     
        </div>
    );
};

export default Interview;
