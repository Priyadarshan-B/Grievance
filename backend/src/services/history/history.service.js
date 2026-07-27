import pool from "../../config/db.js";

// Internal Helper
export const addHistory = async ({
    grievanceId,
    changedBy = null,
    action,
    oldStatus = null,
    newStatus = null,
    remarks = null,
    metadata = null
}) => {

    const result = await pool.query(
        `
        INSERT INTO grievance_history
        (
            grievance_id,
            changed_by,
            action,
            old_status,
            new_status,
            remarks,
            metadata
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
        [
            grievanceId,
            changedBy,
            action,
            oldStatus,
            newStatus,
            remarks,
            metadata
        ]
    );

    return result.rows[0];

};

// Get History
export const getHistoryService = async (grievanceId) => {

    const result = await pool.query(
        `
        SELECT
            gh.id,
            gh.action,
            gh.old_status,
            gh.new_status,
            gh.remarks,
            gh.metadata,
            gh.created_at,

            u.id AS user_id,
            u.full_name,
            u.role

        FROM grievance_history gh

        LEFT JOIN users u
            ON u.id = gh.changed_by

        WHERE grievance_id = $1

        ORDER BY gh.created_at DESC
        `,
        [grievanceId]
    );

    return result.rows;

};