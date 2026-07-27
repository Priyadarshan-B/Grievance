import pool from "../config/db.js";
import { hashPassword } from "../utils/password.js";

const seedSuperAdmin = async () => {
    try {

        const existingUser = await pool.query(
            "SELECT id FROM users WHERE email = $1",
            ["bpriyan18082004@gmail.com"]
        );

        if (existingUser.rows.length > 0) {
            console.log("⚠️ Super Admin already exists.");
            process.exit(0);
        }

        const username = "priyan_admin";
        const password = "Priyan@2026!";

        const passwordHash = await hashPassword(password);

        const result = await pool.query(
            `
            INSERT INTO users
            (
                username,
                password_hash,
                login_type,
                full_name,
                email,
                phone,
                role,
                first_login,
                is_active
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING
                id,
                username,
                full_name,
                email,
                role
            `,
            [
                username,
                passwordHash,
                "manual",
                "Priyan",
                "bpriyan18082004@gmail.com",
                "9876543210",
                "super_admin",
                0,
                1
            ]
        );

        console.log("\n=================================");
        console.log(" Super Admin Created Successfully");
        console.log("=================================");
        console.table(result.rows);

        console.log("\nLogin Credentials");
        console.log("--------------------------");
        console.log(`Username : ${username}`);
        console.log(`Password : ${password}`);
        console.log("--------------------------");

        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedSuperAdmin();