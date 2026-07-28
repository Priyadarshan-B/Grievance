import { getDashboardStatsService } from "../../services/admin/dashboard.service.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await getDashboardStatsService();

    res.json({
      success: true,
      data: stats,
    });
  } catch (err) {
    next(err);
  }
};
