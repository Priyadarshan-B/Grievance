import pool from "../../config/db.js";

// Assign Department Admin
export const assignDepartmentAdminService = async (data) => {

    const {
        user_id,
        department_id
    } = data;

    // Check user
    const user = await pool.query(
        `
        SELECT id, role
        FROM users
        WHERE id = $1
        `,
        [user_id]
    );

    if (user.rows.length === 0) {
        throw new Error("User not found.");
    }

    if (
        user.rows[0].role !== "dept_admin" &&
        user.rows[0].role !== "super_admin"
    ) {
        throw new Error("User is not a department admin.");
    }

    // Check department
    const department = await pool.query(
        `
        SELECT id
        FROM departments
        WHERE id = $1
        AND is_active = 1
        `,
        [department_id]
    );

    if (department.rows.length === 0) {
        throw new Error("Department not found.");
    }

    // Duplicate check
    const exists = await pool.query(
        `
        SELECT id
        FROM department_admins
        WHERE user_id = $1
        AND department_id = $2
        `,
        [
            user_id,
            department_id
        ]
    );

    if (exists.rows.length > 0) {
        throw new Error("Assignment already exists.");
    }

    const result = await pool.query(
        `
        INSERT INTO department_admins
        (
            user_id,
            department_id
        )
        VALUES
        ($1,$2)
        RETURNING *
        `,
        [
            user_id,
            department_id
        ]
    );

    return result.rows[0];
};

// Get All Assignments
export const getDepartmentAdminsService = async () => {

    const result = await pool.query(
        `
        SELECT
            da.id,
            da.is_active,
            da.assigned_at,

            u.id AS user_id,
            u.full_name,
            u.email,

            d.id AS department_id,
            d.department_name

        FROM department_admins da

        JOIN users u
            ON da.user_id = u.id

        JOIN departments d
            ON da.department_id = d.id

        ORDER BY d.department_name
        `
    );

    return result.rows;
};

// Get Admins By Department
export const getDepartmentAdminsByDepartmentService = async (departmentId) => {

    const result = await pool.query(
        `
        SELECT
            da.id,
            da.assigned_at,
            da.is_active,
            u.id AS user_id,
            u.full_name,
            u.email
        FROM department_admins da
        JOIN users u
            ON da.user_id = u.id
        WHERE da.department_id = $1
        `,
        [departmentId]
    );

    return result.rows;
};

// Get Departments By User
export const getDepartmentsByUserService = async (userId) => {

    const result = await pool.query(
        `
        SELECT
            da.id,
            da.assigned_at,
            da.is_active,
            d.id AS department_id,
            d.department_name
        FROM department_admins da
        JOIN departments d
            ON da.department_id = d.id
        WHERE da.user_id = $1
        `,
        [userId]
    );

    return result.rows;
};

// Update Assignment Status
export const updateDepartmentAdminStatusService = async (id, is_active) => {

    const result = await pool.query(
        `
        UPDATE department_admins
        SET is_active = $1
        WHERE id = $2
        RETURNING *
        `,
        [
            is_active,
            id
        ]
    );

    if (result.rows.length === 0) {
        throw new Error("Assignment not found.");
    }

    return result.rows[0];
};

// Delete Assignment
export const deleteDepartmentAdminService = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM department_admins
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Assignment not found.");
    }

    return {
        success: true
    };
};