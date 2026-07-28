import express from "express";

import {
  getUserDashboard,
  getAdminDashboard,
} from "../../controllers/dashboard/dashboard.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();

// Student Dashboard
router.get("/user", authenticate, authorize("user"), getUserDashboard);

// Admin Dashboard (Department Admin + Super Admin)
router.get(
  "/admin",
  authenticate,
  authorize("dept_admin", "super_admin"),
  getAdminDashboard,
);

export default router;
