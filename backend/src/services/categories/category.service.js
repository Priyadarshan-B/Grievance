import pool from "../../config/db.js";

// Create
export const createCategoryService = async (data) => {
  const { department_id, category_name, description } = data;

  const department = await pool.query(
    "SELECT id FROM departments WHERE id = $1",
    [department_id],
  );

  if (department.rows.length === 0) {
    throw new Error("Department not found.");
  }

  const exists = await pool.query(
    `
        SELECT id
        FROM categories
        WHERE department_id = $1
        AND category_name = $2
        `,
    [department_id, category_name],
  );

  if (exists.rows.length > 0) {
    throw new Error("Category already exists.");
  }

  const result = await pool.query(
    `
        INSERT INTO categories
        (
            department_id,
            category_name,
            description,
            is_active
        )
        VALUES
        ($1,$2,$3,1)
        RETURNING
            id,
            department_id,
            category_name,
            description,
            is_active
        `,
    [department_id, category_name, description],
  );

  return result.rows[0];
};

// Get All
export const getCategoriesService = async () => {
  const result = await pool.query(
    `
SELECT
    c.id,
    c.department_id,
    d.department_name,
    c.category_name,
    c.description,
    c.is_active
FROM categories c
JOIN departments d
    ON c.department_id = d.id
ORDER BY d.department_name, c.category_name;
        `,
  );

  return result.rows;
};

// Get By ID
export const getCategoryByIdService = async (id) => {
  const result = await pool.query(
    `
        SELECT
            c.id,
            c.department_id,
            d.department_name,
            c.category_name,
            c.description,
            c.is_active
        FROM categories c
        JOIN departments d
            ON c.department_id = d.id
        WHERE c.id = $1
        `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error("Category not found.");
  }

  return result.rows[0];
};

// Get By Department
export const getCategoriesByDepartmentService = async (departmentId) => {
  const result = await pool.query(
    `
        SELECT
            id,
            category_name,
            description,
            is_active
        FROM categories
        WHERE department_id = $1
        ORDER BY category_name
        `,
    [departmentId],
  );

  return result.rows;
};

// Update
export const updateCategoryService = async (id, data) => {
  const { department_id, category_name, description } = data;

  const result = await pool.query(
    `
        UPDATE categories
        SET
            department_id = $1,
            category_name = $2,
            description = $3
        WHERE id = $4
        RETURNING
            id,
            department_id,
            category_name,
            description,
            is_active
        `,
    [department_id, category_name, description, id],
  );

  if (result.rows.length === 0) {
    throw new Error("Category not found.");
  }

  return result.rows[0];
};

// Update Status
export const updateCategoryStatusService = async (id, is_active) => {
  const result = await pool.query(
    `
        UPDATE categories
        SET
            is_active = $1
        WHERE id = $2
        RETURNING
            id,
            category_name,
            is_active
        `,
    [is_active, id],
  );

  if (result.rows.length === 0) {
    throw new Error("Category not found.");
  }

  return result.rows[0];
};

// Delete
export const deleteCategoryService = async (id) => {
  const result = await pool.query(
    `
        DELETE FROM categories
        WHERE id = $1
        RETURNING id
        `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error("Category not found.");
  }

  return {
    success: true,
  };
};
