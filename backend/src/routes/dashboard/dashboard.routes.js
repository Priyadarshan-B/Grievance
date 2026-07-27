import express from "express";

import {
    getUserDashboard,
    getDepartmentDashboard,
    getAdminDashboard,
} from "../../controllers/dashboard/dashboard.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();

router.get(
    "/user",
    authenticate,
    authorize("user", "dept_admin", "super_admin"),
    getUserDashboard
);

router.get(
    "/department",
    authenticate,
    authorize("dept_admin"),
    getDepartmentDashboard
);

router.get(
    "/admin",
    authenticate,
    authorize("super_admin"),
    getAdminDashboard
);

export default router;