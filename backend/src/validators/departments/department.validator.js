export const validateCreateDepartment = (req, res, next) => {

    const {
        department_name,
        department_code
    } = req.body;

    if (!department_name || !department_code) {
        return res.status(400).json({
            success: false,
            message: "Department name and code are required."
        });
    }

    next();
};

export const validateUpdateDepartment = (req, res, next) => {

    const {
        department_name,
        department_code
    } = req.body;

    if (!department_name || !department_code) {
        return res.status(400).json({
            success: false,
            message: "Department name and code are required."
        });
    }

    next();
};