import pool from "../config/db.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const loginService = async (username, password) => {

    const result = await pool.query(
        `
        SELECT
            id,
            username,
            password_hash,
            full_name,
            email,
            role,
            first_login,
            is_active
        FROM users
        WHERE username = $1
        `,
        [username]
    );

    if (result.rows.length === 0) {
        throw new Error("Invalid username or password.");
    }

    const user = result.rows[0];

    if (user.is_active !== 1) {
        throw new Error("Account is inactive.");
    }

    const isMatch = await comparePassword(
        password,
        user.password_hash
    );

    if (!isMatch) {
        throw new Error("Invalid username or password.");
    }

    delete user.password_hash;

    // Username login always enters User Portal
    const mode = "user";

    const token = generateToken({
        id: user.id,
        username: user.username,
        role: user.role,
        mode
    });

    return {
        token,
        mode,
        user
    };

};