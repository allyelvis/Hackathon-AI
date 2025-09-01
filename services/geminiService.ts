
import { GoogleGenAI, Type } from "@google/genai";
import type { GeminiAnalysis, Project } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    summary: { 
      type: Type.STRING, 
      description: "A concise, 2-3 sentence summary of the project's goal and functionality." 
    },
    innovationScore: { 
      type: Type.INTEGER, 
      description: "A score from 1-10 on the project's novelty and innovation." 
    },
    technicalComplexityScore: { 
      type: Type.INTEGER, 
      description: "A score from 1-10 on the technical difficulty and execution." 
    },
    businessPotentialScore: { 
      type: Type.INTEGER, 
      description: "A score from 1-10 on the project's market viability and potential impact." 
    },
    strengths: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3 key strengths of the project.",
    },
    weaknesses: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3 potential weaknesses or areas for improvement.",
    },
    suggestedQuestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 3 insightful questions to ask the team during their presentation.",
    },
  },
  required: [
    "summary", 
    "innovationScore", 
    "technicalComplexityScore", 
    "businessPotentialScore", 
    "strengths", 
    "weaknesses", 
    "suggestedQuestions"
  ],
};

export const analyzeProjectWithGemini = async (project: Project): Promise<GeminiAnalysis> => {
  const prompt = `
    Analyze the following hackathon project submission. Provide a fair and critical assessment based on the provided details.

    Project Name: ${project.name}
    Project Description: ${project.description}
    Repository Link: ${project.repoUrl}
    Demo Link: ${project.demoUrl}

    Your task is to act as an expert hackathon judge. Evaluate the project based on innovation, technical complexity, and business potential. Return your analysis in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    // Gemini may sometimes wrap the JSON in markdown backticks
    const cleanedJsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    const analysis = JSON.parse(cleanedJsonText) as GeminiAnalysis;

    return analysis;
  } catch (error) {
    console.error("Error analyzing project with Gemini:", error);
    throw new Error("Failed to get analysis from Gemini. Please check the API key and network connection.");
  }
};

export const generateTaglineWithGemini = async (project: Project): Promise<string> => {
  const prompt = `
    Based on the following hackathon project, generate a catchy, one-sentence tagline suitable for a presentation slide or announcement.

    Project Name: ${project.name}
    Project Description: ${project.description}

    The tagline should be concise, memorable, and capture the essence of the project. Return only the tagline text, without any quotes or introductory phrases.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        temperature: 0.8,
        maxOutputTokens: 50,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating tagline with Gemini:", error);
    throw new Error("Failed to generate tagline from Gemini.");
  }
};
