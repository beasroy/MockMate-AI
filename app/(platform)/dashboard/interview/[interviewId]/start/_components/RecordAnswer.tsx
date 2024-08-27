'use client';

interface Questions {
    question: string;
    answer: string;
}

interface InterviewData {
    id: number;
    jsonMockResp: string; 
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdAt: string;
    createdBy: string;
    mockId: string;
}

interface RecordAnsProps {
    mockInterviewQuestion: Questions[];
    activeQuestionIndex: number;
    interviewData: InterviewData;
}


import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState, useTransition } from 'react';
import useSpeechToText, { ResultType } from 'react-hook-speech-to-text';
import { Disc2, Mic } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { saveUserAnswer } from "../actions" 
import Webcam from 'react-webcam'


const RecordAnswer: React.FC<RecordAnsProps> = ({ mockInterviewQuestion, activeQuestionIndex, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [initialResultsCount, setInitialResultsCount] = useState<number>(0);
    const [hasStartedRecording, setHasStartedRecording] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
 

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    });

    useEffect(() => {
        results.forEach((result) => {
            if (typeof result !== 'string') {
                setUserAnswer((prevAns) => prevAns + (result as ResultType).transcript);
            }
        });
    }, [results]);

    const { user } = useUser();

    const handleRecording = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setHasStartedRecording(true);
            setInitialResultsCount(results.length);
            startSpeechToText();
        }
    };

    const handleSaveAnswer = () => {
        if (userAnswer.length < 10) {
            toast('Error while saving your answer. Please record again.');
            return;
        }

        // Use startTransition to avoid blocking the UI
        startTransition(() => {
            saveUserAnswer({
                mockId: interviewData.mockId,
                question: mockInterviewQuestion[activeQuestionIndex].question,
                correctAns: mockInterviewQuestion[activeQuestionIndex].answer,
                userAns: userAnswer,
                userEmail: user?.primaryEmailAddress?.emailAddress ?? '',
            }).then((response) => {
                if (response.success) {
                    toast(response.message);
                } else {
                    toast.error(response.message);
                }
            });
        });
    };

    useEffect(() => {
        if (hasStartedRecording && !isRecording) {
            const newResultsCount = results.length - initialResultsCount;

            if (newResultsCount > 0) {
                handleSaveAnswer();
            } else {
                toast('No valid input captured. Please try recording again.');
            }
        }
    }, [isRecording]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='md:mt-20 flex flex-col justify-center items-center rounded-lg p-4 bg-black'>
                <Image src={'/webcam.png'} alt='webcam-img' width={200} height={200} className='absolute' />
              
                <Webcam
                    style={{
                        height: 300,
                        width: "100%",
                        zIndex: 10
                    }} 
                    mirrored
                />
            </div>
            <Button disabled={isPending} onClick={handleRecording} variant='outline' className='text-center text-blue-600 my-10'>
                {isRecording ? (
                    <h2 className='flex items-center justify-center text-red-600 gap-2 text-primary animate-pulse'>
                 <Disc2 />
                        Recording....
                    </h2>
                ) : (
                    <h2 className='flex items-center justify-center text-blue-600 gap-2 text-primary'>
                        <Mic />
                        Record Answer
                    </h2>
                )}
            </Button>
        </div>
    );
}

export default RecordAnswer;
