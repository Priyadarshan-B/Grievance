export const validateAssignDepartmentAdmin = (req, res, next) => {

    const {
        user_id,
        department_id
    } = req.body;

    if (!user_id || !department_id) {
        return res.status(400).json({
            success: false,
            message: "User ID and Department ID are required."
        });
    }

    next();
};

export const validateUpdateDepartmentAdminStatus = (req, res, next) => {

    const { is_active } = req.body;

    if (is_active === undefined) {
        return res.status(400).json({
            success: false,
            message: "is_active is required."
        });
    }

    if (![0, 1].includes(Number(is_active))) {
        return res.status(400).json({
            success: false,
            message: "is_active must be 0 or 1."
        });
    }

    next();
};