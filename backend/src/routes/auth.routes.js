import express from "express";
import { login, adminGoogleLogin } from "../controllers/auth.controller.js";
import { validateLogin } from "../validators/auth.validator.js";

const router = express.Router();

// Student Login
router.post("/login", validateLogin, login);

// Admin Google Login
router.post("/admin/google", adminGoogleLogin);

export default router;
