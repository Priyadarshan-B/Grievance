import express from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

import {
    assignDepartmentAdmin,
    getDepartmentAdmins,
    getDepartmentAdminsByDepartment,
    getDepartmentsByUser,
    updateDepartmentAdminStatus,
    deleteDepartmentAdmin
} from "../../controllers/departmentAdmins/departmentAdmin.controller.js";

import {
    validateAssignDepartmentAdmin,
    validateUpdateDepartmentAdminStatus
} from "../../validators/departmentAdmins/departmentAdmin.validator.js";

const router = express.Router();

// Assign Department Admin
router.post(
    "/",
    authenticate,
    authorize("super_admin"),
    validateAssignDepartmentAdmin,
    assignDepartmentAdmin
);

// Get All Assignments
router.get(
    "/",
    authenticate,
    authorize("super_admin"),
    getDepartmentAdmins
);

// Get Admins By Department
router.get(
    "/department/:departmentId",
    authenticate,
    authorize("super_admin"),
    getDepartmentAdminsByDepartment
);

// Get Departments By User
router.get(
    "/user/:userId",
    authenticate,
    authorize("super_admin"),
    getDepartmentsByUser
);

// Update Assignment Status
router.patch(
    "/:id/status",
    authenticate,
    authorize("super_admin"),
    validateUpdateDepartmentAdminStatus,
    updateDepartmentAdminStatus
);

// Delete Assignment
router.delete(
    "/:id",
    authenticate,
    authorize("super_admin"),
    deleteDepartmentAdmin
);

export default router;