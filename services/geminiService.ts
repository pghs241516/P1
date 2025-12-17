import { GoogleGenAI } from "@google/genai";
import { Seed } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSeedAdvice = async (seed: Seed): Promise<string> => {
  try {
    const prompt = `
      "${seed.name}"라는 채소에 대해 한국어로 짧고 유용한 정보를 제공해주세요.
      다음 두 가지 항목으로 나누어 답변해주세요:
      1. 🌱 재배 팁 (간단한 핵심 조언 2-3문장)
      2. 🍳 요리/활용법 (대표적인 활용 방법 1-2문장)
      
      이모지를 적절히 사용하여 친근하게 작성해주세요. 마크다운 형식으로 출력하지 말고 일반 텍스트로 주세요.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "정보를 불러올 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 조언을 가져오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};

export const getSeedImage = async (seedName: string): Promise<string | null> => {
  try {
    const prompt = `A professional studio photo of fresh ${seedName} vegetable, white background, high quality, delicious looking`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "4:3",
        }
      }
    });

    // Iterate through parts to find the image
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData && part.inlineData.data) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};