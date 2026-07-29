import pool from "../../config/db.js";

export async function updateTrustScore(userId, analysis) {
  const result = await pool.query(
    `
        SELECT trust_score,
               ai_flag_count,
               warning_count

        FROM users

        WHERE id=$1
        `,

    [userId],
  );

  const user = result.rows[0];

  let trust = user.trust_score;

  let flags = user.ai_flag_count;

  let warnings = user.warning_count;

  switch (analysis.verdict) {
    case "GENUINE":
      trust = Math.min(100, trust + 2);

      break;

    case "QUESTIONABLE":
      trust -= 5;

      warnings++;

      break;

    case "SPAM":
      trust -= 20;

      flags++;

      break;
  }

  if (analysis.abuse_score >= 70) {
    trust -= 10;
  }

  trust = Math.max(0, trust);

  const active = trust > 20 ? 1 : 0;

  await pool.query(
    `
        UPDATE users

        SET

        trust_score=$1,

        ai_flag_count=$2,

        warning_count=$3,

        is_active=$4

        WHERE id=$5
        `,

    [trust, flags, warnings, active, userId],
  );

  return trust;
}
