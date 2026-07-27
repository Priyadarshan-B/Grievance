export const validateUploadAttachment = (req, res, next) => {

    const { grievanceId } = req.params;

    if (!grievanceId) {
        return res.status(400).json({
            success: false,
            message: "Grievance ID is required."
        });
    }

    next();

};

export const validateDeleteAttachment = (req, res, next) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Attachment ID is required."
        });
    }

    next();

};