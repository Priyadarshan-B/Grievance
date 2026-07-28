import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      username: payload.username,
      role: payload.role,
      mode: payload.mode,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );
};
