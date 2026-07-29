import {
  getUserDashboardService,
  getDepartmentDashboardService,
  getAdminDashboardService,
} from "../../services/dashboard/dashboard.service.js";

// User Dashboard
export const getUserDashboard = async (req, res, next) => {
  try {
    const dashboard = await getUserDashboardService(req.user.id);

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (err) {
    next(err);
  }
};

// Admin Dashboard (Department Admin / Super Admin)
export const getAdminDashboard = async (req, res, next) => {
  try {
    let dashboard;

    switch (req.user.role) {
      case "super_admin":
        dashboard = await getAdminDashboardService();
        break;

      case "dept_admin":
        dashboard = await getDepartmentDashboardService(req.user.id);
        break;

      case "user":
        return res.status(403).json({
          success: false,
          message: "Access denied.",
        });

      default:
        return res.status(403).json({
          success: false,
          message: "Invalid role.",
        });
    }

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (err) {
    next(err);
  }
};