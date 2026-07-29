import pool from "../../config/db.js";

export async function saveAIAnalysis(grievanceId, userId, analysis) {
  await pool.query(
    `
    INSERT INTO grievance_ai_analysis
    (
      grievance_id,
      user_id,

      department,
      department_confidence,
      department_reason,

      priority,
      priority_reason,

      severity_score,

      spam_score,
      abuse_score,
      legitimacy_score,

      summary,
      sentiment,
      verdict,

      suggested_resolution
    )
    VALUES
    (
      $1,$2,
      $3,$4,$5,
      $6,$7,
      $8,
      $9,$10,$11,
      $12,$13,$14,
      $15
    )
    `,
    [
      grievanceId,
      userId,

      analysis.department,
      analysis.department_confidence,
      analysis.department_reason,

      analysis.priority,
      analysis.priority_reason,

      analysis.severity_score,

      analysis.spam_score,
      analysis.abuse_score,
      analysis.legitimacy_score,

      analysis.summary,
      analysis.sentiment,
      analysis.verdict,

      analysis.suggested_resolution,
    ],
  );
}
