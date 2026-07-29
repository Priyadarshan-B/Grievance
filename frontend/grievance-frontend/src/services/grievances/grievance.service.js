import api from "../../api/axios";

export const getMyGrievances = async () => {
  const response = await api.get("/grievances/my");
  return response.data;
};

/**
 * Get grievance details
 */
export const getGrievanceById = async (id) => {
  const response = await api.get(`/grievances/${id}`);
  return response.data;
};

/**
 * Create grievance
 */
export const createGrievance = async (payload) => {
  const response = await api.post("/grievances", payload);
  return response.data;
};

/**
 * Update grievance status
 */
export const updateGrievanceStatus = async (id, payload) => {
  const response = await api.patch(`/grievances/${id}/status`, payload);

  return response.data;
};

/**
 * Delete grievance
 */
export const deleteGrievance = async (id) => {
  const response = await api.delete(`/grievances/${id}`);

  return response.data;
};

export const getDepartmentGrievances = () =>
    api.get("/grievances");

export const reviewGrievance = (id, data) =>
    api.put(`/grievances/${id}/review`, data);

export const resolveGrievance = (id, data) =>
    api.put(`/grievances/${id}/resolve`, data);

export const rejectGrievance = (id, data) =>
    api.put(`/grievances/${id}/reject`, data);

export const changeDepartment = (id, payload) =>
  api.patch(`/grievances/${id}/change-department`, payload);

export const getDepartments = () =>
  api.get("/departments");