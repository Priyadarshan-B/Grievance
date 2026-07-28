import pool from "../../config/db.js";

export const getDashboardStatsService = async () => {
  const [
    users,
    departments,
    categories,
    grievances,
    pending,
    progress,
    resolved,
    rejected,
  ] = await Promise.all([
    pool.query(`SELECT COUNT(*) FROM users`),

    pool.query(`SELECT COUNT(*) FROM departments`),

    pool.query(`SELECT COUNT(*) FROM categories`),

    pool.query(`SELECT COUNT(*) FROM grievances`),

    pool.query(`
            SELECT COUNT(*)
            FROM grievances
            WHERE status='submitted'
        `),

    pool.query(`
            SELECT COUNT(*)
            FROM grievances
            WHERE status='in_progress'
        `),

    pool.query(`
            SELECT COUNT(*)
            FROM grievances
            WHERE status='resolved'
        `),

    pool.query(`
            SELECT COUNT(*)
            FROM grievances
            WHERE status='rejected'
        `),
  ]);

  return {
    totalUsers: Number(users.rows[0].count),

    totalDepartments: Number(departments.rows[0].count),

    totalCategories: Number(categories.rows[0].count),

    totalGrievances: Number(grievances.rows[0].count),

    submitted: Number(pending.rows[0].count),

    inProgress: Number(progress.rows[0].count),

    resolved: Number(resolved.rows[0].count),

    rejected: Number(rejected.rows[0].count),
  };
};
