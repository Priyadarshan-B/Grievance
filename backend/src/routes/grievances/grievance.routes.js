import express from "express";

import {
  createGrievance,
  getGrievances,
  getGrievanceById,
  getMyGrievances,
  updateGrievanceStatus,
  deleteGrievance,
  assignGrievance,
  getDepartmentGrievances,
  reviewGrievance,
  resolveGrievance,
  rejectGrievance,
} from "../../controllers/grievances/grievance.controller.js";

import {
  validateCreateGrievance,
  validateUpdateStatus,
  validateAssignGrievance,
} from "../../validators/grievances/grievance.validator.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();

// User Routes
// Create Grievance
router.post(
  "/",
  authenticate,
  authorize("user"),
  validateCreateGrievance,
  createGrievance,
);

// Logged-in User Grievances
router.get("/my", authenticate, authorize("user"), getMyGrievances);

// Department Admin Routes
// Department Grievances
router.get(
  "/department",
  authenticate,
  authorize("dept_admin", "super_admin"),
  getDepartmentGrievances,
);

// Super Admin / Department Admin Routes
// Get All Grievances
router.get(
  "/",
  authenticate,
  authorize("dept_admin", "super_admin"),
  getGrievances,
);

// Get Grievance By ID
router.get(
  "/:id",
  authenticate,
  authorize("user", "dept_admin", "super_admin"),
  getGrievanceById,
);

// Update Status
router.patch(
  "/:id/status",
  authenticate,
  authorize("dept_admin", "super_admin"),
  validateUpdateStatus,
  updateGrievanceStatus,
);

// Assign Department Admin
router.patch(
  "/:id/assign",
  authenticate,
  authorize("super_admin"),
  validateAssignGrievance,
  assignGrievance,
);

// Review Grievance
router.put(
  "/:id/review",
  authenticate,
  authorize("dept_admin", "super_admin"),
  reviewGrievance,
);

// Resolve Grievance
router.put(
  "/:id/resolve",
  authenticate,
  authorize("dept_admin", "super_admin"),
  resolveGrievance,
);

// Reject Grievance
router.put(
  "/:id/reject",
  authenticate,
  authorize("dept_admin", "super_admin"),
  rejectGrievance,
);

// Delete Grievance
router.delete("/:id", authenticate, authorize("super_admin"), deleteGrievance);

export default router;
