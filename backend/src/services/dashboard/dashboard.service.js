import pool from "../../config/db.js";

// Convert PostgreSQL COUNT(*) strings to numbers
const toNumber = (row) => {
  Object.keys(row).forEach((key) => {
    if (!isNaN(row[key])) {
      row[key] = Number(row[key]);
    }
  });

  return row;
};

// =========================
// User Dashboard
// =========================

export const getUserDashboardService = async (userId) => {
  const summaryResult = await pool.query(
    `
        SELECT
            COUNT(*) AS total,

            COUNT(*) FILTER (WHERE status = 'submitted') AS submitted,

            COUNT(*) FILTER (WHERE status = 'assigned') AS assigned,

            COUNT(*) FILTER (WHERE status = 'in_progress') AS in_progress,

            COUNT(*) FILTER (WHERE status = 'resolved') AS resolved,

            COUNT(*) FILTER (WHERE status = 'closed') AS closed,

            COUNT(*) FILTER (WHERE status = 'rejected') AS rejected,

            COUNT(*) FILTER (WHERE status = 'reopened') AS reopened

        FROM grievances

        WHERE user_id = $1
        `,
    [userId],
  );

  const monthlyResult = await pool.query(
    `
    SELECT

        TO_CHAR(DATE_TRUNC('month', submitted_at), 'Mon') AS month,

        COUNT(*)::int AS count

    FROM grievances

    WHERE user_id = $1

    GROUP BY DATE_TRUNC('month', submitted_at)

    ORDER BY DATE_TRUNC('month', submitted_at)
    `,
    [userId],
  );

  return {
    ...toNumber(summaryResult.rows[0]),
    monthly: monthlyResult.rows,
  };
};

// =========================
// Department Admin Dashboard
// =========================

export const getDepartmentDashboardService = async (userId) => {
  const departmentResult = await pool.query(
    `
        SELECT department_id

        FROM department_admins

        WHERE user_id = $1
        AND is_active = 1
        `,
    [userId],
  );

  if (departmentResult.rows.length === 0) {
    return {
      total: 0,
      submitted: 0,
      assigned: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0,
      rejected: 0,
      reopened: 0,
      monthly: [],
    };
  }

  const departmentIds = departmentResult.rows.map((row) => row.department_id);

  const summaryResult = await pool.query(
    `
        SELECT

            COUNT(*) AS total,

            COUNT(*) FILTER (WHERE g.status = 'submitted') AS submitted,

            COUNT(*) FILTER (WHERE g.status = 'assigned') AS assigned,

            COUNT(*) FILTER (WHERE g.status = 'in_progress') AS in_progress,

            COUNT(*) FILTER (WHERE g.status = 'resolved') AS resolved,

            COUNT(*) FILTER (WHERE g.status = 'closed') AS closed,

            COUNT(*) FILTER (WHERE g.status = 'rejected') AS rejected,

            COUNT(*) FILTER (WHERE g.status = 'reopened') AS reopened

        FROM grievances g

        JOIN categories c
            ON g.category_id = c.id

        WHERE c.department_id = ANY($1::int[])
        `,
    [departmentIds],
  );

  const monthlyResult = await pool.query(
    `
    SELECT

        TO_CHAR(DATE_TRUNC('month', g.submitted_at), 'Mon') AS month,

        COUNT(*)::int AS count

    FROM grievances g

    JOIN categories c
        ON g.category_id = c.id

    WHERE c.department_id = ANY($1::int[])

    GROUP BY DATE_TRUNC('month', g.submitted_at)

    ORDER BY DATE_TRUNC('month', g.submitted_at)
    `,
    [departmentIds],
  );

  return {
    ...toNumber(summaryResult.rows[0]),
    monthly: monthlyResult.rows,
  };
};

// =========================
// Super Admin Dashboard
// =========================

// =========================
// Super Admin Dashboard
// =========================

export const getAdminDashboardService = async () => {
  const summaryResult = await pool.query(`
        SELECT

            (SELECT COUNT(*) FROM users WHERE is_active = 1) AS users,

            (SELECT COUNT(*) FROM departments WHERE is_active = 1) AS departments,

            (SELECT COUNT(*) FROM categories WHERE is_active = 1) AS categories,

            (SELECT COUNT(*) FROM grievances) AS total,

            (SELECT COUNT(*) FROM grievances) AS grievances, 
            
            (SELECT COUNT(*) FROM grievances WHERE status = 'submitted') AS submitted,

            (SELECT COUNT(*) FROM grievances WHERE status = 'assigned') AS assigned,

            (SELECT COUNT(*) FROM grievances WHERE status = 'in_progress') AS in_progress,

            (SELECT COUNT(*) FROM grievances WHERE status = 'resolved') AS resolved,

            (SELECT COUNT(*) FROM grievances WHERE status = 'closed') AS closed,

            (SELECT COUNT(*) FROM grievances WHERE status = 'rejected') AS rejected,

            (SELECT COUNT(*) FROM grievances WHERE status = 'reopened') AS reopened
    `);

  const monthlyResult = await pool.query(`
        SELECT

            TO_CHAR(DATE_TRUNC('month', submitted_at), 'Mon') AS month,

            COUNT(*)::int AS count

        FROM grievances

        GROUP BY DATE_TRUNC('month', submitted_at)

        ORDER BY DATE_TRUNC('month', submitted_at)
    `);

  return {
    ...toNumber(summaryResult.rows[0]),
    monthly: monthlyResult.rows,
  };
};
