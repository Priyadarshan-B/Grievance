import { model } from "../../config/gemini.js";

export async function analyzeGrievance(title, description, departments = []) {
  const departmentList = departments.join("\n");

  const prompt = `
You are an AI grievance moderation, prioritization and routing system for a university.

Analyze the grievance carefully.

AVAILABLE DEPARTMENTS

${departmentList}

Rules

- Choose ONLY ONE department from the above list.
- Never invent a department.
- Return ONLY valid JSON.
- No markdown.
- No explanation.

Title:
${title}

Description:
${description}

Evaluate the grievance and generate:

1. department
2. department_confidence (0-100)
3. department_reason

4. priority
Choose ONLY:
LOW
MEDIUM
HIGH
CRITICAL

5. priority_reason

6. severity_score (0-100)

Severity Guide

0-20
Very Minor

21-40
Minor

41-60
Moderate

61-80
Serious

81-100
Critical

7. spam_score (0-100)

8. abuse_score (0-100)

9. legitimacy_score (0-100)

10. summary
One or two sentences.

11. sentiment

Choose ONLY one:

Positive
Neutral
Negative
Concerned
Frustrated
Angry
Urgent

12. verdict

Choose ONLY:

GENUINE
QUESTIONABLE
SPAM

13. suggested_resolution

Write 2-3 sentences describing how the university should resolve the issue.

Return ONLY this JSON:

{
  "department":"",
  "department_confidence":0,
  "department_reason":"",
  "priority":"MEDIUM",
  "priority_reason":"",
  "severity_score":50,
  "spam_score":0,
  "abuse_score":0,
  "legitimacy_score":100,
  "summary":"",
  "sentiment":"Neutral",
  "verdict":"GENUINE",
  "suggested_resolution":""
}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleaned);

  return {
    department: parsed.department ?? "",
    department_confidence: parsed.department_confidence ?? 0,
    department_reason: parsed.department_reason ?? "",

    priority: parsed.priority ?? "MEDIUM",
    priority_reason: parsed.priority_reason ?? "",

    severity_score: parsed.severity_score ?? 50,

    spam_score: parsed.spam_score ?? 0,
    abuse_score: parsed.abuse_score ?? 0,
    legitimacy_score: parsed.legitimacy_score ?? 100,

    summary: parsed.summary ?? "",
    sentiment: parsed.sentiment ?? "Neutral",
    verdict: parsed.verdict ?? "GENUINE",

    suggested_resolution: parsed.suggested_resolution ?? "",
  };
}
