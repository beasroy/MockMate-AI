import { LightbulbIcon } from "lucide-react";
import { config } from "dotenv";
import { resolve } from "path";

interface Questions {
  question: string;
  answer: string;
}

interface QuestionProps {
    mockInterviewQuestion: Questions[];
    activeQuestionIndex: number;
    setActiveQuestionIndex: (index: number) => void;
  }

config({ path: resolve(__dirname, ".env.local") });

const Question: React.FC<QuestionProps> = ({ mockInterviewQuestion, activeQuestionIndex,setActiveQuestionIndex }) => {
  const isQuestionValid = 
    mockInterviewQuestion && 
    mockInterviewQuestion.length > 0 && 
    activeQuestionIndex >= 0 && 
    activeQuestionIndex < mockInterviewQuestion.length;

  return (
    isQuestionValid && (
      <div className='p-5 shadow-md border rounded-lg my-10'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockInterviewQuestion.map((question, index) => (
            <div key={index}>
              <h2 onClick={()=>setActiveQuestionIndex(index)} className={`rounded-full p-2 text-center text-xs md:text-sm cursor-pointer ${activeQuestionIndex === index ? 'bg-primary text-white' : 'bg-white text-black'}`}>
                Question #{index + 1}
              </h2>
            </div>
          ))}
        </div>

        <h2 className="my-5 text-base md:text-lg">{mockInterviewQuestion[activeQuestionIndex].question}</h2>

        <div className="border rounded-lg bg-blue-100 text-primary p-5 mt-16">
          <h2 className="flex items-center gap-2">
            <LightbulbIcon />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
      </div>
    )
  );
};

export default Question;
