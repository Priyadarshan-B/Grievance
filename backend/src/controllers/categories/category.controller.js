import {
    createCategoryService,
    getCategoriesService,
    getCategoryByIdService,
    getCategoriesByDepartmentService,
    updateCategoryService,
    updateCategoryStatusService,
    deleteCategoryService
} from "../../services/categories/category.service.js";

export const createCategory = async (req, res, next) => {
    try {

        const category = await createCategoryService(req.body);

        res.status(201).json({
            success: true,
            message: "Category created successfully.",
            data: category
        });

    } catch (err) {
        next(err);
    }
};

export const getCategories = async (req, res, next) => {
    try {

        const categories = await getCategoriesService();

        res.json({
            success: true,
            data: categories
        });

    } catch (err) {
        next(err);
    }
};

export const getCategoryById = async (req, res, next) => {
    try {

        const category = await getCategoryByIdService(req.params.id);

        res.json({
            success: true,
            data: category
        });

    } catch (err) {
        next(err);
    }
};

export const getCategoriesByDepartment = async (req, res, next) => {
    try {

        const categories = await getCategoriesByDepartmentService(
            req.params.departmentId
        );

        res.json({
            success: true,
            data: categories
        });

    } catch (err) {
        next(err);
    }
};

export const updateCategory = async (req, res, next) => {
    try {

        const category = await updateCategoryService(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Category updated successfully.",
            data: category
        });

    } catch (err) {
        next(err);
    }
};

export const updateCategoryStatus = async (req, res, next) => {
    try {

        const category = await updateCategoryStatusService(
            req.params.id,
            req.body.is_active
        );

        res.json({
            success: true,
            message: "Category status updated.",
            data: category
        });

    } catch (err) {
        next(err);
    }
};

export const deleteCategory = async (req, res, next) => {
    try {

        await deleteCategoryService(req.params.id);

        res.json({
            success: true,
            message: "Category deleted successfully."
        });

    } catch (err) {
        next(err);
    }
};