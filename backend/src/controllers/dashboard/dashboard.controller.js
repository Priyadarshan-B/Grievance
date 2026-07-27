import {
    getUserDashboardService,
    getDepartmentDashboardService,
    getAdminDashboardService,
} from "../../services/dashboard/dashboard.service.js";

// =========================
// User Dashboard
// =========================
export const getUserDashboard = async (req, res, next) => {
    try {

        const dashboard = await getUserDashboardService(req.user.id);

        return res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (err) {
        next(err);
    }
};

// =========================
// Department Admin Dashboard
// =========================
export const getDepartmentDashboard = async (req, res, next) => {
    try {

        const dashboard = await getDepartmentDashboardService(req.user.id);

        return res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (err) {
        next(err);
    }
};

// =========================
// Super Admin Dashboard
// =========================
export const getAdminDashboard = async (req, res, next) => {
    try {

        const dashboard = await getAdminDashboardService();

        return res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (err) {
        next(err);
    }
};