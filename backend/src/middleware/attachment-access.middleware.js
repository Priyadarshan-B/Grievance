import pool from "../config/db.js";

export const checkAttachmentAccess = async (req, res, next) => {

    try {

        const { id } = req.params;

        const result = await pool.query(
            `
            SELECT
                ga.grievance_id,
                g.user_id,
                g.department_id
            FROM grievance_attachments ga
            JOIN grievances g
                ON g.id = ga.grievance_id
            WHERE ga.id = $1
            `,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Attachment not found."
            });
        }

        const attachment = result.rows[0];

        // Super Admin
        if (req.user.role === "super_admin") {
            return next();
        }

        // User -> Own grievance only
        if (
            req.user.role === "user" &&
            attachment.user_id === req.user.id
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
                    attachment.department_id
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