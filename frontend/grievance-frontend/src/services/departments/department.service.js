import api from "../../api/axios";

export const getDepartments = () =>
    api.get("/departments");

export const getDepartmentById = (id) =>
    api.get(`/departments/${id}`);

export const createDepartment = (data) =>
    api.post("/departments", data);

export const updateDepartment = (id, data) =>
    api.put(`/departments/${id}`, data);

export const updateDepartmentStatus = (id, is_active) =>
    api.patch(`/departments/${id}/status`, {
        is_active,
    });

export const deleteDepartment = (id) =>
    api.delete(`/departments/${id}`);