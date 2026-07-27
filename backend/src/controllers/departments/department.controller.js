import {
    createDepartmentService,
    getDepartmentsService,
    getDepartmentByIdService,
    updateDepartmentService,
    updateDepartmentStatusService,
    deleteDepartmentService
} from "../../services/departments/department.service.js";

/* =========================
   Create Department
========================= */
export const createDepartment = async (req, res, next) => {
    try {

        const department = await createDepartmentService(req.body);

        res.status(201).json({
            success: true,
            message: "Department created successfully.",
            data: department
        });

    } catch (err) {
        next(err);
    }
};

/* =========================
   Get All Departments
========================= */
export const getDepartments = async (req, res, next) => {
    try {

        const departments = await getDepartmentsService();

        res.json({
            success: true,
            data: departments
        });

    } catch (err) {
        next(err);
    }
};

/* =========================
   Get Department By ID
========================= */
export const getDepartmentById = async (req, res, next) => {
    try {

        const department = await getDepartmentByIdService(req.params.id);

        res.json({
            success: true,
            data: department
        });

    } catch (err) {
        next(err);
    }
};

/* =========================
   Update Department
========================= */
export const updateDepartment = async (req, res, next) => {
    try {

        const department = await updateDepartmentService(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Department updated successfully.",
            data: department
        });

    } catch (err) {
        next(err);
    }
};

/* =========================
   Update Department Status
========================= */
export const updateDepartmentStatus = async (req, res, next) => {
    try {

        const department = await updateDepartmentStatusService(
            req.params.id,
            req.body.is_active
        );

        res.json({
            success: true,
            message: "Department status updated.",
            data: department
        });

    } catch (err) {
        next(err);
    }
};

/* =========================
   Delete Department
========================= */
export const deleteDepartment = async (req, res, next) => {
    try {

        await deleteDepartmentService(req.params.id);

        res.json({
            success: true,
            message: "Department deleted successfully."
        });

    } catch (err) {
        next(err);
    }
};