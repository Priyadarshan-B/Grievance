import { model } from "../../config/gemini.js";

export async function analyzeGrievance(title, description, departments = []) {
  const departmentList = departments
    .map((d) => `Department Name: ${d.name}\nDepartment Code: ${d.code}`)
    .join("\n\n");

  const prompt = `
You are an AI grievance moderation, prioritization and routing system for a university.

Analyze the grievance carefully and determine which university department should handle it.

AVAILABLE DEPARTMENTS

${departmentList}

DEPARTMENT ROUTING RULES

1. Choose ONLY ONE department from the available departments.

2. You MUST return a department name and department code
   that exactly match one of the available departments.

3. Users may refer to departments using:
   - the full department name
   - the department code
   - abbreviations
   - short forms
   - informal names
   - keywords related to the department's responsibilities

4. Understand the meaning of the grievance rather than relying only
   on exact keyword matching.

5. Never invent a department or department code.

6. Use the following department meanings as guidance:

Academics (ACA):
Academic-related matters such as courses, subjects, faculty, classes,
attendance, academic regulations, teaching and learning issues.

Reward Points (RP):
Reward points, student reward points, points not credited,
points calculation, reward-related issues.

Hostel (H):
Hostel accommodation, rooms, hostel facilities, hostel maintenance,
food, mess, water, electricity, cleanliness, wardens and hostel-related issues.

Administration (AD):
General administrative matters, certificates, documents,
official requests, permissions and administrative services.

Personalised Skill (PS):
Skill development programs, personalised skill activities,
skill courses, skill assessments and related issues.

Transport (TRAN):
College buses, routes, bus timings, transportation,
bus drivers, stops and transport-related issues.

Accounts (ACC):
Fees, payments, refunds, receipts, transactions,
financial issues and account-related matters.

Training and Placement (T/P):
Placements, internships, companies, placement drives,
interviews, job opportunities and training-and-placement matters.

Controller of Examination (CoE):
Examinations, exam schedules, hall tickets, marks,
results, arrears, revaluation, exam registration,
question papers and examination-related issues.

IMPORTANT:
A user may use a short form or informal wording.

Examples:

"my exam mark is wrong"
-> Controller of Examination (CoE)

"coe issue"
-> Controller of Examination (CoE)

"bus didn't come today"
-> Transport (TRAN)

"tran problem"
-> Transport (TRAN)

"hostel food is bad"
-> Hostel (H)

"rp points not updated"
-> Reward Points (RP)

"my placement interview issue"
-> Training and Placement (T/P)

"fee payment failed"
-> Accounts (ACC)

"certificate request"
-> Administration (AD)

"attendance issue"
-> Academics (ACA)

"skill course problem"
-> Personalised Skill (PS)

These examples are only guidance. Always analyze the actual grievance.

Return ONLY valid JSON.
No markdown.
No explanation outside JSON.

Title:
${title}

Description:
${description}

Evaluate the grievance and generate:

1. department
   Exact department name from the available departments.

2. department_code
   Exact department code from the available departments.

3. department_confidence
   Number from 0-100.

4. department_reason
   Brief reason for selecting the department.

5. priority
   Choose ONLY:
   LOW
   MEDIUM
   HIGH
   CRITICAL

6. priority_reason

7. severity_score
   Number from 0-100.

Severity Guide:

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

8. spam_score
   Number from 0-100.

9. abuse_score
   Number from 0-100.

10. legitimacy_score
    Number from 0-100.

11. summary
    One or two sentences.

12. sentiment

Choose ONLY one:

Positive
Neutral
Negative
Concerned
Frustrated
Angry
Urgent

13. verdict

Choose ONLY:

GENUINE
QUESTIONABLE
SPAM

14. suggested_resolution

Write 2-3 sentences describing how the university should resolve the issue.

Return ONLY this JSON:

{
  "department": "",
  "department_code": "",
  "department_confidence": 0,
  "department_reason": "",
  "priority": "MEDIUM",
  "priority_reason": "",
  "severity_score": 50,
  "spam_score": 0,
  "abuse_score": 0,
  "legitimacy_score": 100,
  "summary": "",
  "sentiment": "Neutral",
  "verdict": "GENUINE",
  "suggested_resolution": ""
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
    department_code: parsed.department_code ?? "",
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
