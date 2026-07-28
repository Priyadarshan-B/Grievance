import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

import { getDashboardStats } from "../../controllers/admin/dashboard.controller.js";

const router = Router();

router.get(
  "/dashboard",
  authenticate,
  authorize("super_admin"),
  getDashboardStats,
);

export default router;
