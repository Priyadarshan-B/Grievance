import express from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoriesByDepartment,
  updateCategory,
  updateCategoryStatus,
  deleteCategory,
} from "../../controllers/categories/category.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

import {
  validateCreateCategory,
  validateUpdateCategory,
} from "../../validators/categories/category.validator.js";

const router = express.Router();

// Super Admin
router.post(
  "/",
  authenticate,
  authorize("super_admin"),
  validateCreateCategory,
  createCategory,
);

router.get(
  "/",
  authenticate,
  authorize("user", "dept_admin", "super_admin"),
  getCategories,
);

// User, Department Admin & Super Admin
router.get(
  "/department/:departmentId",
  authenticate,
  authorize("user", "dept_admin", "super_admin"),
  getCategoriesByDepartment,
);

router.get("/:id", authenticate, authorize("super_admin"), getCategoryById);

router.put(
  "/:id",
  authenticate,
  authorize("super_admin"),
  validateUpdateCategory,
  updateCategory,
);

router.patch(
  "/:id/status",
  authenticate,
  authorize("super_admin"),
  updateCategoryStatus,
);

router.delete("/:id", authenticate, authorize("super_admin"), deleteCategory);

export default router;
