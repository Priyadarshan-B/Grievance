import express from "express";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { checkGrievanceAccess } from "../../middleware/grievance-access.middleware.js";
import { checkAttachmentAccess } from "../../middleware/attachment-access.middleware.js";
import upload from "../../middleware/upload.middleware.js";

import {
    uploadAttachment,
    getAttachments,
    deleteAttachment,
    getAttachmentUrl
} from "../../controllers/attachments/attachment.controller.js";

import {
    validateUploadAttachment,
    validateDeleteAttachment
} from "../../validators/attachments/attachment.validator.js";

const router = express.Router();

// Upload Attachment
router.post(
    "/:grievanceId",
    authenticate,
    authorize("user", "dept_admin", "super_admin"),
    checkGrievanceAccess,
    upload.single("file"),
    validateUploadAttachment,
    uploadAttachment
);

// Get Attachments
router.get(
    "/:grievanceId",
    authenticate,
    authorize("user", "dept_admin", "super_admin"),
    checkGrievanceAccess,
    getAttachments
);

// Download Attachment
router.get(
    "/download/:id",
    authenticate,
    authorize("user", "dept_admin", "super_admin"),
    checkAttachmentAccess,
    getAttachmentUrl
);

// Delete Attachment
router.delete(
    "/:id",
    authenticate,
    authorize("super_admin"),
    validateDeleteAttachment,
    deleteAttachment
);

export default router;