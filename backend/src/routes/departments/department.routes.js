import express from "express";

import {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    updateDepartmentStatus,
    deleteDepartment
} from "../../controllers/departments/department.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

import {
    validateCreateDepartment,
    validateUpdateDepartment
} from "../../validators/departments/department.validator.js";

const router = express.Router();

router.use(authenticate);
router.use(authorize("super_admin"));

router.post(
    "/",
    validateCreateDepartment,
    createDepartment
);

router.get(
    "/",
    getDepartments
);

router.get(
    "/:id",
    getDepartmentById
);

router.put(
    "/:id",
    validateUpdateDepartment,
    updateDepartment
);

router.patch(
    "/:id/status",
    updateDepartmentStatus
);

router.delete(
    "/:id",
    deleteDepartment
);

export default router;