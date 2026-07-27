export const validateCreateCategory = (req, res, next) => {

    const {
        department_id,
        category_name
    } = req.body;

    if (!department_id || !category_name) {
        return res.status(400).json({
            success: false,
            message: "Department and category name are required."
        });
    }

    next();
};

export const validateUpdateCategory = (req, res, next) => {

    const {
        department_id,
        category_name
    } = req.body;

    if (!department_id || !category_name) {
        return res.status(400).json({
            success: false,
            message: "Department and category name are required."
        });
    }

    next();
};