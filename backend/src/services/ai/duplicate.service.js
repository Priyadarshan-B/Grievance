import pool from "../../config/db.js";
import { model } from "../../config/gemini.js";

export const checkDuplicateGrievance = async (
  userId,
  title,
  description
) => {
  const result = await pool.query(
    `
    SELECT
      grievance_no,
      title,
      description,
      status
    FROM grievances
    WHERE user_id = $1
    ORDER BY submitted_at DESC
    LIMIT 10
    `,
    [userId]
  );

  // No previous grievances
  if (result.rows.length === 0) {
    return {
      duplicate: false,
      similarity: 0,
      grievance_no: null,
      reason: "No previous grievances found.",
    };
  }

  // -----------------------------
  // Exact Match Check (No AI)
  // -----------------------------
  const exact = result.rows.find(
    (g) =>
      g.title.trim().toLowerCase() === title.trim().toLowerCase() &&
      g.description.trim().toLowerCase() ===
        description.trim().toLowerCase()
  );

  if (exact) {
    return {
      duplicate: true,
      similarity: 100,
      grievance_no: exact.grievance_no,
      reason: "Exact duplicate grievance.",
    };
  }

  // -----------------------------
  // Prepare Previous Grievances
  // -----------------------------
  const previous = result.rows
    .map(
      (g) => `
Grievance No: ${g.grievance_no}
Title: ${g.title}
Description: ${g.description}
Status: ${g.status}
`
    )
    .join("\n--------------------------\n");

  // -----------------------------
  // Gemini Prompt
  // -----------------------------
  const prompt = `
You are an AI duplicate grievance detector.

Compare ONE new grievance with the user's previous grievances.

A grievance is considered a duplicate ONLY IF ALL of these conditions are true:

1. It is about the SAME issue.
2. It refers to the SAME location or department.
3. It requests the SAME resolution.
4. It describes the SAME incident.
5. A reasonable human would treat both complaints as the same grievance.

Do NOT mark grievances as duplicates just because they are in the same category.

Examples:

Duplicate:
- "Wi-Fi not working in Library"
- "Library Wi-Fi has no internet"

Duplicate:
- "Project evaluation delayed"
- "My final project marks have still not been released"

NOT Duplicate:
- "Library Wi-Fi not working"
- "Water leakage in Engineering Block"

NOT Duplicate:
- "Exam result delay"
- "Faculty attendance issue"

NEW GRIEVANCE

Title:
${title}

Description:
${description}

PREVIOUS GRIEVANCES

${previous}

Return ONLY valid JSON.

{
  "duplicate": false,
  "similarity": 0,
  "reason": "",
  "grievance_no": ""
}
`;

  // -----------------------------
  // Gemini Analysis
  // -----------------------------
  const response = await model.generateContent(prompt);

  let text = response.response.text();

  text = text.replace(/```json|```/g, "").trim();

  console.log("Gemini Duplicate Response:", text);

  try {
    const parsed = JSON.parse(text);

    return {
      duplicate: Boolean(parsed.duplicate),
      similarity: Number(parsed.similarity || 0),
      grievance_no: parsed.grievance_no || null,
      reason: parsed.reason || "",
    };
  } catch (err) {
    console.error("Duplicate Detection JSON Error:", err);

    return {
      duplicate: false,
      similarity: 0,
      grievance_no: null,
      reason: "Unable to parse Gemini response.",
    };
  }
};