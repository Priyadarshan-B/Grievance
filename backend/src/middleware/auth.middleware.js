import jwt from "jsonwebtoken";
import env from "../config/env.js";
import pool from "../config/db.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Token required.",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const result = await pool.query(
      `
  SELECT
      u.id,
      u.username,
      u.full_name,
      u.email,
      u.role,
      u.is_active,
      da.department_id
  FROM users u
  LEFT JOIN department_admins da
      ON da.user_id = u.id
      AND da.is_active = 1
  WHERE u.id = $1
  `,
      [decoded.id],
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = result.rows[0];
    console.log("Authenticated User:", req.user);

    next();
  } catch (err) {
    console.log(err);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
