
import { db } from '@/utils/db';
import { UserAnswers } from '@/utils/schema';
import moment from 'moment';
import { chatSession } from '@/utils/GeminiAiModel';

export async function saveUserAnswer({
    mockId,
    question,
    correctAns,
    userAns,
    userEmail
}: {
    mockId: string;
    question: string;
    correctAns: string;
    userAns: string;
    userEmail: string;
}) {
    try {
       
        const feedbackPrompt =  `Question: ${question}, User Answer: ${userAns} Depends on question and user answer for given interview question.Please give us rating for answer and feedback as area of improvement if any in just 3 to 5 lines to improve it in JSON format with rating field and feedback field`;
        const feedback = await chatSession.sendMessage(feedbackPrompt);
        const feedbackText = await feedback.response.text();

        
        const cleanText = feedbackText.replace(/```json/, "").replace(/```/, "").trim();
        const parsedFeedbackJson = JSON.parse(cleanText);

        

        if (!parsedFeedbackJson.rating || !parsedFeedbackJson.feedback) {
            return { success: false, message: 'Invalid AI feedback format' };
        }

        await db.insert(UserAnswers).values({
            mockIdRef: mockId,
            question,
            correctAns,
            userAns,
            feedback: parsedFeedbackJson.feedback,
            rating: parsedFeedbackJson.rating,
            userEmail,
            createdAt: moment().format("DD-MM-YYYY"),
        });


        return { success: true, message: 'User answer recorded successfully' };
    } catch (error) {
        console.error('Error saving user answer:', error);
        return { success: false, message: 'Failed to record user answer' };
    }
}
