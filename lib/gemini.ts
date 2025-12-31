
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const geminiModel = genAI ? genAI.getGenerativeModel({ model: "gemini-1.5-flash" }) : null;

export interface ScoredArticle {
    score: number;
    summary_fr: string;
}

export async function scoreArticle(title: string, summary: string): Promise<ScoredArticle> {
    if (!geminiModel) {
        console.warn("GOOGLE_GENERATIVE_AI_API_KEY is not set. Returning default score.");
        return { score: 50, summary_fr: summary }; // Fallback
    }

    const prompt = `
Tu agis en tant qu'éditeur en chef de 'Keyo', un site de cybersécurité grand public. Voici un titre et un résumé d'article :
**Titre :** ${title}
**Résumé :** ${summary}

Évalue la pertinence de cet article selon 3 critères :
1. Urgence (Est-ce que l'utilisateur doit agir maintenant ?)
2. Impact (Combien de personnes sont touchées ?)
3. Éducation (Est-ce qu'on apprend quelque chose ?)

Retourne un objet JSON uniquement : {"score": 0-100, "summary_fr": "Un résumé en une phrase en français traduit"}.
Rien d'autre que le JSON.
`;

    try {
        const result = await geminiModel.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code blocks
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Error scoring article with Gemini:", error);
        return { score: 50, summary_fr: summary }; // Fallback on error
    }
}
