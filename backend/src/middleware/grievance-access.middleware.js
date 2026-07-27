import pool from "../config/db.js";

export const checkGrievanceAccess = async (req, res, next) => {

    try {

        const grievanceId =
            req.params.grievanceId ||
            req.params.id;

        const result = await pool.query(
            `
            SELECT
                g.user_id,
                g.department_id
            FROM grievances g
            WHERE g.id = $1
            `,
            [grievanceId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Grievance not found."
            });
        }

        const grievance = result.rows[0];

        // Super Admin
        if (req.user.role === "super_admin") {
            return next();
        }

        // User -> Own grievance only
        if (
            req.user.role === "user" &&
            grievance.user_id === req.user.id
        ) {
            return next();
        }

        // Department Admin
        if (req.user.role === "dept_admin") {

            const department = await pool.query(
                `
                SELECT 1
                FROM department_admins
                WHERE
                    user_id = $1
                    AND department_id = $2
                    AND is_active = 1
                `,
                [
                    req.user.id,
                    grievance.department_id
                ]
            );

            if (department.rows.length > 0) {
                return next();
            }

        }

        return res.status(403).json({
            success: false,
            message: "Access denied."
        });

    } catch (err) {
        next(err);
    }

};