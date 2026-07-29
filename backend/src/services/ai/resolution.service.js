import { model } from "../../config/gemini.js";

export const generateResolutionSuggestion = async (title, description) => {
  const prompt = `
You are an experienced university grievance officer.

A grievance has been submitted.

Title:
${title}

Description:
${description}

Return ONLY JSON.

{
    "root_cause":"",
    "recommended_action":"",
    "resolution":"",
    "prevention":"",
    "priority":""
}
`;

  const response = await model.generateContent(prompt);

  let text = response.response.text();

  text = text.replace(/```json|```/g, "").trim();

  return JSON.parse(text);
};
