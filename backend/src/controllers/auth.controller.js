import { loginService } from "../services/auth.service.js";

export const login = async (req, res, next) => {
    try {

        const { username, password } = req.body;

        const data = await loginService(username, password);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data
        });

    } catch (error) {
        next(error);
    }
};