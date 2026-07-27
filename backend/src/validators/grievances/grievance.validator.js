export const validateCreateGrievance = (req, res, next) => {

    const {
        category_id,
        title,
        description
    } = req.body;

    if (!category_id || !title || !description) {
        return res.status(400).json({
            success: false,
            message: "Category, title and description are required."
        });
    }

    next();
};

export const validateUpdateStatus = (req, res, next) => {

    const { status } = req.body;

    const validStatus = [
        "submitted",
        "assigned",
        "in_progress",
        "resolved",
        "closed",
        "reopened",
        "rejected"
    ];

    if (!status || !validStatus.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid grievance status."
        });
    }

    next();
};

export const validateAssignGrievance = (req, res, next) => {

    const { resolved_by } = req.body;

    if (!resolved_by) {
        return res.status(400).json({
            success: false,
            message: "resolved_by is required."
        });
    }

    next();
};