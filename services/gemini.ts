
import { GoogleGenAI } from "@google/genai";
import { GAMES } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function getGameRecommendation(userPrompt: string) {
  const gamesContext = GAMES.map(g => 
    `${g.title}: ${g.players}, ${g.duration}, $${g.price}. Description: ${g.description}`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the Nexus Game Zone Guru. Help the user choose a game from our catalog.
      
      Our Catalog:
      ${gamesContext}
      
      User Inquiry: "${userPrompt}"
      
      Be friendly, enthusiastic, and concise. Recommend 1-2 games based on their needs.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });

    return response.text || "I'm having trouble connecting to the gaming matrix. Try asking about our VR or Arcade options!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The systems are recalibrating. Why not try our Cyber-Racing in the meantime?";
  }
}
