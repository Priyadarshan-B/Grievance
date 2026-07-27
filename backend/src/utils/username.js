import crypto from "crypto";

export const generateUsername = async (pool) => {
    while (true) {
        const username = crypto.randomBytes(5).toString("hex"); // 10 chars

        const { rows } = await pool.query(
            "SELECT 1 FROM users WHERE username = $1 LIMIT 1",
            [username]
        );

        if (rows.length === 0) {
            return username;
        }
    }
};