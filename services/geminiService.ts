import { GoogleGenAI, Type } from "@google/genai";
import { ProfessionAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeProfession = async (jobTitle: string): Promise<ProfessionAnalysis> => {
  const model = "gemini-2.5-flash";

  const prompt = `
    Act as a world-class labor economist and AI futurist. 
    Analyze the future of the profession: "${jobTitle}" over the next 10 years (2024-2034).
    
    Based on recent employment statistics, technological advancements in LLMs, robotics, and automation:
    1. Estimate the percentage of tasks performed by AI vs Humans over time.
    2. Identify specific subfields within this profession and their susceptibility to automation.
    3. Recommend skills needed to survive/thrive.
    
    Provide a realistic, data-informed projection. Be honest about displacement risks but also highlight augmentation opportunities.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          jobTitle: { type: Type.STRING },
          summary: { type: Type.STRING, description: "A comprehensive 2-3 sentence summary of the future outlook." },
          overallRiskScore: { type: Type.NUMBER, description: "A score from 0 to 100 indicating the risk of job displacement by AI." },
          timeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.NUMBER },
                humanShare: { type: Type.NUMBER, description: "Percentage of value/work contributed by humans (0-100)" },
                aiShare: { type: Type.NUMBER, description: "Percentage of value/work contributed by AI (0-100)" },
                description: { type: Type.STRING, description: "Short note on the tech advancement this year" }
              },
              required: ["year", "humanShare", "aiShare"]
            }
          },
          subfields: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                riskScore: { type: Type.NUMBER, description: "0-100 risk score" },
                impactDescription: { type: Type.STRING },
                automationType: { type: Type.STRING, enum: ["Augmentation", "Replacement", "New Creation"] }
              },
              required: ["name", "riskScore", "impactDescription", "automationType"]
            }
          },
          skillsToSurvive: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                relevance: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
                category: { type: Type.STRING, enum: ["Technical", "Soft Skill", "Strategic"] }
              },
              required: ["skill", "relevance", "category"]
            }
          }
        },
        required: ["jobTitle", "summary", "overallRiskScore", "timeline", "subfields", "skillsToSurvive"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No response received from AI");
  }

  try {
    return JSON.parse(response.text) as ProfessionAnalysis;
  } catch (e) {
    console.error("Failed to parse JSON", response.text);
    throw new Error("Failed to parse AI analysis");
  }
};