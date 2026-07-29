import { getDashboardStatsService } from "../../services/admin/dashboard.service.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const dashboard = await getDashboardStatsService(req.user);
    console.log(dashboard);
    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (err) {
    next(err);
  }
};
