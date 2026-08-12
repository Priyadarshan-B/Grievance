import pool from "../../config/db.js";

export const getDashboardStatsService = async (user) => {
  let whereClause = "g.is_active=1";
  const params = [];

  if (user.role === "dept_admin") {
    const department = await pool.query(
      `
      SELECT department_id
      FROM department_admins
      WHERE user_id=$1
      AND is_active=1
      `,
      [user.id],
    );

    if (department.rows.length === 0) {
      return {};
    }

    whereClause += " AND g.department_id=$1";
    params.push(department.rows[0].department_id);
  }

  const summary = await pool.query(
    `
    SELECT
      COUNT(*) AS total_grievances,
      COUNT(*) FILTER (WHERE g.status='submitted') AS submitted,
      COUNT(*) FILTER (WHERE g.status='assigned') AS assigned,
      COUNT(*) FILTER (WHERE g.status='in_progress') AS in_progress,
      COUNT(*) FILTER (WHERE g.status='resolved') AS resolved,
      COUNT(*) FILTER (WHERE g.status='rejected') AS rejected,

      ROUND(AVG(ai.severity_score),2) AS avg_severity,
      ROUND(AVG(ai.legitimacy_score),2) AS avg_legitimacy,
      ROUND(AVG(ai.spam_score),2) AS avg_spam,
      ROUND(AVG(ai.abuse_score),2) AS avg_abuse

    FROM grievances g

    LEFT JOIN grievance_ai_analysis ai
      ON ai.grievance_id=g.id

    WHERE ${whereClause}
    `,
    params,
  );

  const departmentWise = await pool.query(
    `
  SELECT
    d.department_name,
    d.department_code,
    COUNT(g.id)::int AS total

  FROM departments d

  LEFT JOIN grievances g
    ON g.department_id = d.id
    AND g.is_active = 1

  GROUP BY d.department_name, d.department_code

  ORDER BY total DESC
  `,
  );

  const priorityWise = await pool.query(
    `
    SELECT
      priority,
      COUNT(*)::int AS total

    FROM grievance_ai_analysis

    GROUP BY priority

    ORDER BY total DESC
    `,
  );

  const sentimentWise = await pool.query(
    `
    SELECT
      sentiment,
      COUNT(*)::int AS total

    FROM grievance_ai_analysis

    GROUP BY sentiment

    ORDER BY total DESC
    `,
  );

  const recent = await pool.query(
    `
    SELECT
      g.id,
      g.grievance_no,
      g.title,
      g.status,
      g.priority,
      g.submitted_at,
      d.department_name,
      ai.severity_score,
      ai.verdict

    FROM grievances g

    JOIN departments d
      ON d.id=g.department_id

    LEFT JOIN grievance_ai_analysis ai
      ON ai.grievance_id=g.id

    WHERE ${whereClause}

    ORDER BY g.submitted_at DESC

    LIMIT 10
    `,
    params,
  );

  const monthly = await pool.query(
    `
  SELECT
    TO_CHAR(DATE_TRUNC('month', g.submitted_at), 'Mon') AS month,
    COUNT(*)::int AS count
  FROM grievances g
  WHERE ${whereClause}
  GROUP BY DATE_TRUNC('month', g.submitted_at)
  ORDER BY DATE_TRUNC('month', g.submitted_at)
  `,
    params,
  );

  return {
    summary: summary.rows[0],
    monthly: monthly.rows,
    departmentWise: departmentWise.rows,
    priorityWise: priorityWise.rows,
    sentimentWise: sentimentWise.rows,
    recent: recent.rows,
  };
};
