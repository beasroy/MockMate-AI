'use client';
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText, { ResultType } from 'react-hook-speech-to-text';

function RecordAnswer() {
    const[userAnswer, setUserAnswer]=useState<string>('');
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });
    useEffect(() => {
        results.forEach((result) => {
          if (typeof result !== 'string') {
            setUserAnswer((prevAns) => prevAns + (result as ResultType).transcript);
          }
        });
      }, [results]);
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='md:mt-20 flex flex-col justify-center items-center rounded-lg p-4 bg-black'>
                <Image src={'/webcam.png'} alt='webcam-img' width={200} height={200} className='absolute' />
                <Webcam
                    style={{
                        height: 300,
                        width: "100%",
                        zIndex: 10
                    }} />
            </div>
            <Button onClick={isRecording ? stopSpeechToText : startSpeechToText} variant="outline" className='text-center my-10'>
             {isRecording ? <h2>Recording.... </h2>: 'Record Answer'}</Button>            
        </div>
    )
}

export default RecordAnswer