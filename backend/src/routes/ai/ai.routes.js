import express from "express";
import {
  getAISuggestion, reAnalyzeGrievance
} from "../../controllers/ai/ai.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";

const router = express.Router();

router.get(
  "/:id/ai-suggestion",
  authenticate,
  authorize("dept_admin", "super_admin"),
  getAISuggestion,
);

router.post(
  "/grievances/:id/reanalyze",
  authenticate,
  authorize("dept_admin", "super_admin"),
  reAnalyzeGrievance
);
export default router;
