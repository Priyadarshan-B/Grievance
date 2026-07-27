import pool from "../../config/db.js";

// Generate Grievance Number
const generateGrievanceNumber = async () => {

    const year = new Date().getFullYear();

    const result = await pool.query(
        `
        SELECT grievance_no
        FROM grievances
        ORDER BY submitted_at DESC
        LIMIT 1
        `
    );

    let sequence = 1;

    if (result.rows.length > 0) {
        const lastNo = result.rows[0].grievance_no;
        sequence = parseInt(lastNo.slice(-4)) + 1;
    }

    return `GRV-${year}-${String(sequence).padStart(4, "0")}`;
};

// Create
export const createGrievanceService = async (data, userId) => {

    const {
        category_id,
        title,
        description,
        priority
    } = data;

    const category = await pool.query(
        `
        SELECT department_id
        FROM categories
        WHERE id = $1
        `,
        [category_id]
    );

    if (category.rows.length === 0) {
        throw new Error("Category not found.");
    }

    const department_id = category.rows[0].department_id;

    const grievance_no = await generateGrievanceNumber();

    const result = await pool.query(
        `
        INSERT INTO grievances
        (
            grievance_no,
            user_id,
            department_id,
            category_id,
            title,
            description,
            priority
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7)
        RETURNING *
        `,
        [
            grievance_no,
            userId,
            department_id,
            category_id,
            title,
            description,
            priority || "medium"
        ]
    );

    return result.rows[0];
};

// Get All
export const getGrievancesService = async () => {

    const result = await pool.query(
        `
        SELECT
            g.*,
            u.full_name,
            d.department_name,
            c.category_name
        FROM grievances g
        JOIN users u
            ON g.user_id = u.id
        JOIN departments d
            ON g.department_id = d.id
        JOIN categories c
            ON g.category_id = c.id
        ORDER BY g.submitted_at DESC
        `
    );

    return result.rows;
};

// Get By ID
export const getGrievanceByIdService = async (id) => {

    const result = await pool.query(
        `
        SELECT
            g.*,
            u.full_name,
            d.department_name,
            c.category_name
        FROM grievances g
        JOIN users u
            ON g.user_id = u.id
        JOIN departments d
            ON g.department_id = d.id
        JOIN categories c
            ON g.category_id = c.id
        WHERE g.id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Grievance not found.");
    }

    return result.rows[0];
};

// Get My Grievances
export const getMyGrievancesService = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            g.id,
            g.title,
            g.description,
            g.status,
            g.priority,
            g.submitted_at,

            c.id AS category_id,
            c.category_name,

            d.id AS department_id,
            d.department_name

        FROM grievances g

        JOIN categories c
            ON g.category_id = c.id

        JOIN departments d
            ON c.department_id = d.id

        WHERE g.user_id = $1

        ORDER BY g.submitted_at DESC
        `,
        [userId]
    );

    return result.rows;
};
// Update Status
export const updateGrievanceStatusService = async (
    id,
    status,
    resolved_by = null
) => {

    const result = await pool.query(
        `
        UPDATE grievances
        SET
            status = $1,
            resolved_by = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING *
        `,
        [
            status,
            resolved_by,
            id
        ]
    );

    if (result.rows.length === 0) {
        throw new Error("Grievance not found.");
    }

    return result.rows[0];
};

// Delete
export const deleteGrievanceService = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM grievances
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Grievance not found.");
    }

    return {
        success: true
    };
};

// Assign Grievance
export const assignGrievanceService = async (
    grievanceId,
    resolved_by
) => {

    const userResult = await pool.query(
        `
        SELECT id, role
        FROM users
        WHERE id = $1
        `,
        [resolved_by]
    );

    if (userResult.rows.length === 0) {
        throw new Error("Department admin not found.");
    }

    if (
        userResult.rows[0].role !== "dept_admin" &&
        userResult.rows[0].role !== "super_admin"
    ) {
        throw new Error("Invalid assignee.");
    }

    const result = await pool.query(
        `
        UPDATE grievances
        SET
            resolved_by = $1,
            status = 'assigned',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
        `,
        [
            resolved_by,
            grievanceId
        ]
    );

    if (result.rows.length === 0) {
        throw new Error("Grievance not found.");
    }

    return result.rows[0];
};