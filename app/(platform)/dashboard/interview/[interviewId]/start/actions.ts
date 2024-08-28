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
        // Generate feedback prompt for the AI
        const feedbackPrompt = `Question: ${question}, User Answer: ${userAns}. Please rate the answer on a scale of 1 to 5 and provide feedback on areas for improvement in 3 to 5 lines in JSON format with fields 'rating' and 'feedback'.`;
        const feedback = await chatSession.sendMessage(feedbackPrompt);
        
        const feedbackText = await feedback.response.text();
        const cleanText = feedbackText.replace(/```json/, "").replace(/```/, "").trim();
        
        let parsedFeedbackJson;

        // Try parsing the AI response as JSON
        try {
            parsedFeedbackJson = JSON.parse(cleanText);
        } catch (error) {
            console.error('Error parsing AI feedback as JSON:', error);
            return { success: false, message: 'Invalid AI feedback format (JSON parse error)' };
        }

        // Validate the parsed JSON structure
        if (!parsedFeedbackJson || typeof parsedFeedbackJson.rating !== 'number' || typeof parsedFeedbackJson.feedback !== 'string') {
            console.error('AI feedback is missing expected fields:', parsedFeedbackJson);
            return { success: false, message: 'Invalid AI feedback format (Missing fields)' };
        }

        // Insert the user's answer and AI feedback into the database
        await db.insert(UserAnswers).values({
            mockIdRef: mockId,
            question,
            correctAns,
            userAns,
            feedback: parsedFeedbackJson.feedback,
            rating: parsedFeedbackJson.rating,
            userEmail,
            createdAt: moment().format('DD-MM-YYYY'),
        });

        return { success: true, message: 'User answer recorded successfully' };
    } catch (error) {
        console.error('Error saving user answer:', error);
        return { success: false, message: 'Failed to record user answer' };
    }
}
