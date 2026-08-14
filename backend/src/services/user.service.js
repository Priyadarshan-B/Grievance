import pool from "../config/db.js";
import { hashPassword } from "../utils/password.js";
import { generateUsername } from "../utils/username.js";
import { generatePassword } from "../utils/passwordGenerator.js";

/* =========================
   Create User
========================= */
export const createUserService = async (data) => {
  const { full_name, email, phone, role, user_type = "student" } = data;

  const validRoles = ["user", "dept_admin", "super_admin"];
  const validUserTypes = ["student", "faculty"];

  if (!validRoles.includes(role)) {
    throw new Error("Invalid role.");
  }

  if (!validUserTypes.includes(user_type)) {
    throw new Error("Invalid user type. Use student or faculty.");
  }

  // Admin accounts are faculty accounts.
  const finalUserType =
    role === "dept_admin" || role === "super_admin" ? "faculty" : user_type;

  // Check email
  const emailExists = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
  );

  if (emailExists.rows.length > 0) {
    throw new Error("Email already exists.");
  }

  const username = await generateUsername(pool);

  const plainPassword = generatePassword();

  const hashedPassword = await hashPassword(plainPassword);

  const result = await pool.query(
    `
        INSERT INTO users
        (
            full_name,
            email,
            phone,
            username,
            password_hash,
            role,
            user_type,
            first_login,
            is_active
        )
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,1,1)
        RETURNING
            id,
            full_name,
            email,
            phone,
            username,
            role,
            user_type,
            first_login,
            is_active,
            created_at
        `,
    [full_name, email, phone, username, hashedPassword, role, finalUserType],
  );

  return {
    user: result.rows[0],
    credentials: {
      username,
      password: plainPassword,
    },
  };
};

/* =========================
   Get All Users
========================= */
export const getUsersService = async () => {
  const result = await pool.query(`
        SELECT
            id,
            full_name,
            email,
            phone,
            username,
            role,
            user_type,
            first_login,
            is_active,
            created_at
        FROM users
        ORDER BY created_at DESC
    `);

  return result.rows;
};

/* =========================
   Get User By ID
========================= */
export const getUserByIdService = async (id) => {
  const result = await pool.query(
    `
        SELECT
            id,
            full_name,
            email,
            phone,
            username,
            role,
            user_type,
            first_login,
            is_active,
            created_at
        FROM users
        WHERE id = $1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found.");
  }

  return result.rows[0];
};

/* =========================
   Update User
========================= */
export const updateUserService = async (id, data) => {
  const { full_name, email, phone } = data;

  const result = await pool.query(
    `
        UPDATE users
        SET
            full_name = $1,
            email = $2,
            phone = $3,
            updated_at = NOW()
        WHERE id = $4
        RETURNING
            id,
            full_name,
            email,
            phone,
            username,
            role,
            user_type,
            first_login,
            is_active,
            updated_at
    `,
    [full_name, email, phone, id],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found.");
  }

  return result.rows[0];
};

/* =========================
   Activate / Deactivate User
========================= */
export const updateStatusService = async (id, is_active) => {
  const result = await pool.query(
    `
        UPDATE users
        SET
            is_active = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING
            id,
            username,
            is_active
    `,
    [is_active, id],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found.");
  }

  return result.rows[0];
};

/* =========================
   Delete User
========================= */
export const deleteUserService = async (id) => {
  const result = await pool.query(
    `
        DELETE FROM users
        WHERE id = $1
        RETURNING id
        `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found.");
  }

  return {
    success: true,
  };
};

/* =========================
   Get Logged-in User Profile
========================= */
export const getMyProfileService = async (userId) => {
  const result = await pool.query(
    `
  SELECT
      u.id,
      u.full_name,
      u.email,
      u.phone,
      u.username,
      u.role,
      u.user_type,
      u.trust_score,
      u.warning_count,
      u.ai_flag_count,
      u.is_active,
      u.created_at,

      d.department_name

  FROM users u

  LEFT JOIN department_admins da
      ON da.user_id = u.id
      AND da.is_active = 1

  LEFT JOIN departments d
      ON d.id = da.department_id

  WHERE u.id = $1
  `,
    [userId],
  );

  if (result.rows.length === 0) {
    throw new Error("User not found.");
  }

  return result.rows[0];
};
