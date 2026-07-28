import {
  loginService,
  adminGoogleLoginService,
} from "../services/auth.service.js";

// Student Login
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const data = await loginService(username, password);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Google Login
export const adminGoogleLogin = async (req, res, next) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({
        success: false,
        message: "Access token is required.",
      });
    }

    const data = await adminGoogleLoginService(access_token);

    return res.status(200).json({
      success: true,
      message: "Admin login successful.",
      data,
    });
  } catch (error) {
    next(error);
  }
};
