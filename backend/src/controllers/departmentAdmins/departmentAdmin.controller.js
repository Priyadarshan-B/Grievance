import {
    assignDepartmentAdminService,
    getDepartmentAdminsService,
    getDepartmentAdminsByDepartmentService,
    getDepartmentsByUserService,
    updateDepartmentAdminStatusService,
    deleteDepartmentAdminService
} from "../../services/departmentAdmins/departmentAdmin.service.js";

// Assign Department Admin
export const assignDepartmentAdmin = async (req, res, next) => {
    try {

        const assignment = await assignDepartmentAdminService(req.body);

        res.status(201).json({
            success: true,
            message: "Department admin assigned successfully.",
            data: assignment
        });

    } catch (err) {
        next(err);
    }
};

// Get All Assignments
export const getDepartmentAdmins = async (req, res, next) => {
    try {

        const assignments = await getDepartmentAdminsService();

        res.status(200).json({
            success: true,
            data: assignments
        });

    } catch (err) {
        next(err);
    }
};

// Get Admins By Department
export const getDepartmentAdminsByDepartment = async (req, res, next) => {
    try {

        const assignments =
            await getDepartmentAdminsByDepartmentService(
                req.params.departmentId
            );

        res.status(200).json({
            success: true,
            data: assignments
        });

    } catch (err) {
        next(err);
    }
};

// Get Departments By User
export const getDepartmentsByUser = async (req, res, next) => {
    try {

        const assignments =
            await getDepartmentsByUserService(
                req.params.userId
            );

        res.status(200).json({
            success: true,
            data: assignments
        });

    } catch (err) {
        next(err);
    }
};

// Update Assignment Status
export const updateDepartmentAdminStatus = async (req, res, next) => {
    try {

        const assignment =
            await updateDepartmentAdminStatusService(
                req.params.id,
                req.body.is_active
            );

        res.status(200).json({
            success: true,
            message: "Assignment status updated successfully.",
            data: assignment
        });

    } catch (err) {
        next(err);
    }
};

// Delete Assignment
export const deleteDepartmentAdmin = async (req, res, next) => {
    try {

        await deleteDepartmentAdminService(req.params.id);

        res.status(200).json({
            success: true,
            message: "Assignment deleted successfully."
        });

    } catch (err) {
        next(err);
    }
};