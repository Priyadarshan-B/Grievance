export const validateCreateUser = (req, res, next) => {

    const {
        full_name,
        email,
        role
    } = req.body;

    if (!full_name || !email || !role) {
        return res.status(400).json({
            success: false,
            message: "Full name, email and role are required."
        });
    }

    next();
};