import { model } from "../../config/gemini.js";

export async function analyzeGrievance(title, description) {
  const prompt = `
You are an AI grievance moderation system for a university.

Your job is to analyze a student's grievance objectively.

Analyze the following grievance.

Title:
${title}

Description:
${description}

----------------------------------------------------
SCORING RULES
----------------------------------------------------

1. SPAM SCORE (0-100)

Give a HIGH spam score when:

- The complaint is a test.
- It says "ignore this", "testing", "dummy", "sample".
- It has meaningless or random text.
- It does not describe any real issue.
- It requests no action.
- It is intentionally fake.

Examples:

"This is a test."

"Ignore this complaint."

"Random complaint."

"No issue, just checking."

"I want to see if this works."

Spam Score Guide

0-20 = Genuine complaint

21-50 = Weak complaint

51-80 = Suspicious

81-100 = Definitely spam


----------------------------------------------------

2. ABUSE SCORE (0-100)

Increase abuse score when:

- Personal insults
- Offensive language
- Harassment
- Threatening language
- Disrespectful wording

Examples:

"Useless staff"

"Idiots"

"Incompetent people"

"Worst employees"

A complaint may still be genuine even if it contains abusive language.


----------------------------------------------------

3. LEGITIMACY SCORE (0-100)

Increase legitimacy if:

- Specific issue
- Specific location
- Clear incident
- Action requested
- Real-world context

Reduce legitimacy if:

- Random text
- Vague complaint
- Testing message
- No actionable issue


----------------------------------------------------

4. SENTIMENT

Return ONLY one of:

Positive
Neutral
Negative
Concerned
Frustrated
Angry
Urgent


----------------------------------------------------

5. VERDICT

Return ONLY one value.

GENUINE
QUESTIONABLE
SPAM


Use these rules:

GENUINE

- legitimacy >= 70
- spam <= 20

QUESTIONABLE

- legitimacy between 30 and 69
OR
- spam between 21 and 60

SPAM

- spam > 60
OR
- clearly fake/testing/random


----------------------------------------------------

6. SUMMARY

Write 1-2 concise sentences summarizing the grievance.


----------------------------------------------------

IMPORTANT

Return ONLY valid JSON.

No markdown.

No explanation.

Exactly this format:

{
  "spam_score": 0,
  "abuse_score": 0,
  "legitimacy_score": 100,
  "summary": "",
  "sentiment": "Neutral",
  "verdict": "GENUINE"
}
`;

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}