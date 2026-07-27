import pool from "../../config/db.js";

// Create
export const createDepartmentService = async (data) => {

    const {
        department_name,
        department_code,
        email,
        phone
    } = data;

    const exists = await pool.query(
        `
        SELECT id
        FROM departments
        WHERE department_name = $1
           OR department_code = $2
        `,
        [department_name, department_code]
    );

    if (exists.rows.length > 0) {
        throw new Error("Department already exists.");
    }

    const result = await pool.query(
        `
        INSERT INTO departments
        (
            department_name,
            department_code,
            email,
            phone,
            is_active
        )
        VALUES
        ($1,$2,$3,$4,1)
        RETURNING
            id,
            department_name,
            department_code,
            email,
            phone,
            is_active,
            created_at
        `,
        [
            department_name,
            department_code,
            email,
            phone
        ]
    );

    return result.rows[0];
};

// Get All
export const getDepartmentsService = async () => {

    const result = await pool.query(
        `
        SELECT
            id,
            department_name,
            department_code,
            email,
            phone,
            is_active,
            created_at
        FROM departments
        ORDER BY department_name
        `
    );

    return result.rows;
};

// Get By ID
export const getDepartmentByIdService = async (id) => {

    const result = await pool.query(
        `
        SELECT
            id,
            department_name,
            department_code,
            email,
            phone,
            is_active,
            created_at
        FROM departments
        WHERE id = $1
        `,
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Department not found.");
    }

    return result.rows[0];
};

// Update
export const updateDepartmentService = async (id, data) => {

    const {
        department_name,
        department_code,
        email,
        phone
    } = data;

    const result = await pool.query(
        `
        UPDATE departments
        SET
            department_name = $1,
            department_code = $2,
            email = $3,
            phone = $4,
            updated_at = NOW()
        WHERE id = $5
        RETURNING
            id,
            department_name,
            department_code,
            email,
            phone,
            is_active,
            updated_at
        `,
        [
            department_name,
            department_code,
            email,
            phone,
            id
        ]
    );

    if (result.rows.length === 0) {
        throw new Error("Department not found.");
    }

    return result.rows[0];
};

// Update Status
export const updateDepartmentStatusService = async (id, is_active) => {

    const result = await pool.query(
        `
        UPDATE departments
        SET
            is_active = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING
            id,
            department_name,
            department_code,
            is_active
        `,
        [is_active, id]
    );

    if (result.rows.length === 0) {
        throw new Error("Department not found.");
    }

    return result.rows[0];
};

// Delete
export const deleteDepartmentService = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM departments
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    if (result.rows.length === 0) {
        throw new Error("Department not found.");
    }

    return {
        success: true
    };
};