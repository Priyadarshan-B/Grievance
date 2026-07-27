import {
    uploadAttachmentService,
    getAttachmentsService,
    deleteAttachmentService,
    getAttachmentUrlService
} from "../../services/attachments/attachment.service.js";

import { addHistory } from "../../services/history/history.service.js";

// Upload Attachment
export const uploadAttachment = async (req, res, next) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded."
            });
        }

        const attachment = await uploadAttachmentService(
            req.params.grievanceId,
            req.file,
            req.user.id
        );

        await addHistory({
            grievanceId: req.params.grievanceId,
            changedBy: req.user.id,
            action: "ATTACHMENT_UPLOADED",
            remarks: req.file.originalname,
            metadata: {
                file_name: req.file.originalname,
                file_size: req.file.size,
                file_type: req.file.mimetype
            }
        });

        res.status(201).json({
            success: true,
            message: "Attachment uploaded successfully.",
            data: attachment
        });

    } catch (err) {
        next(err);
    }
};

// Get Attachments
export const getAttachments = async (req, res, next) => {
    try {

        const attachments = await getAttachmentsService(
            req.params.grievanceId
        );

        res.status(200).json({
            success: true,
            data: attachments
        });

    } catch (err) {
        next(err);
    }
};

// Delete Attachment
export const deleteAttachment = async (req, res, next) => {
    try {

        const attachment = await deleteAttachmentService(
            req.params.id
        );

        await addHistory({
            grievanceId: attachment.grievance_id,
            changedBy: req.user.id,
            action: "ATTACHMENT_DELETED",
            remarks: attachment.file_name
        });

        res.status(200).json({
            success: true,
            message: "Attachment deleted successfully."
        });

    } catch (err) {
        next(err);
    }
};

export const getAttachmentUrl = async (req, res, next) => {

    try {

        const result = await getAttachmentUrlService(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (err) {
        next(err);
    }

};