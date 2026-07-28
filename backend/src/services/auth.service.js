import pool from "../config/db.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import supabase from "../config/supabase.js";

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

export const adminGoogleLoginService = async (accessToken) => {

    const {
        data,
        error
    } = await supabase.auth.getUser(accessToken);

    if (error || !data.user) {
        throw new Error("Invalid Google token.");
    }

    const googleUser = data.user;

    const result = await pool.query(
        `
        SELECT
            id,
            username,
            full_name,
            email,
            role,
            first_login,
            is_active
        FROM users
        WHERE email = $1
        `,
        [googleUser.email]
    );

    if (result.rows.length === 0) {
        throw new Error("No admin account found.");
    }

    const user = result.rows[0];

    if (user.is_active !== 1) {
        throw new Error("Account is inactive.");
    }

    if (
        user.role !== "department_admin" &&
        user.role !== "super_admin"
    ) {
        throw new Error("Unauthorized.");
    }

    const mode = "admin";

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