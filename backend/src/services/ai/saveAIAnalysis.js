import pool from "../../config/db.js";

export async function saveAIAnalysis(
  grievanceId,

  userId,

  analysis,
) {
  await pool.query(
    `
INSERT INTO grievance_ai_analysis(

grievance_id,

user_id,

spam_score,

abuse_score,

legitimacy_score,

summary,

sentiment,

verdict

)

VALUES(

$1,$2,$3,$4,$5,$6,$7,$8

)
`,

    [
      grievanceId,

      userId,

      analysis.spam_score,

      analysis.abuse_score,

      analysis.legitimacy_score,

      analysis.summary,

      analysis.sentiment,

      analysis.verdict,
    ],
  );
}
