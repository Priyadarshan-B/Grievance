import express from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { checkGrievanceAccess } from "../../middleware/grievance-access.middleware.js";

import { getHistory } from "../../controllers/history/history.controller.js";

import { validateHistoryRequest } from "../../validators/history/history.validator.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Get Grievance History
|--------------------------------------------------------------------------
*/
router.get(
    "/:grievanceId",
    authenticate,
    authorize("user", "dept_admin", "super_admin"),
    checkGrievanceAccess,
    validateHistoryRequest,
    getHistory
);

export default router;