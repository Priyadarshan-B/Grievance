import express from "express";

import {
    createGrievance,
    getGrievances,
    getGrievanceById,
    getMyGrievances,
    updateGrievanceStatus,
    deleteGrievance,
    assignGrievance
} from "../../controllers/grievances/grievance.controller.js";

import {
    validateCreateGrievance,
    validateUpdateStatus,
    validateAssignGrievance
} from "../../validators/grievances/grievance.validator.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();

// Create Grievance
router.post(
    "/",
    authenticate,
    authorize("user"),
    validateCreateGrievance,
    createGrievance
);

// Get Logged-in User Grievances
router.get(
    "/my",
    authenticate,
    authorize("user"),
    getMyGrievances
);

// Get All Grievances
router.get(
    "/",
    authenticate,
    authorize("dept_admin", "super_admin"),
    getGrievances
);

// Get Grievance By ID
router.get(
    "/:id",
    authenticate,
    authorize("user", "dept_admin", "super_admin"),
    getGrievanceById
);

// Update Grievance Status
router.patch(
    "/:id/status",
    authenticate,
    authorize("dept_admin", "super_admin"),
    validateUpdateStatus,
    updateGrievanceStatus
);

// Assign Grievance to Department Admin
router.patch(
    "/:id/assign",
    authenticate,
    authorize("super_admin"),
    validateAssignGrievance,
    assignGrievance
);

// Delete Grievance
router.delete(
    "/:id",
    authenticate,
    authorize("super_admin"),
    deleteGrievance
);

export default router;