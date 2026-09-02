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

export const getDepartmentGrievances = () => api.get("/grievances");

export const reviewGrievance = (id, data) =>
  api.put(`/grievances/${id}/review`, data);

export const resolveGrievance = (id, data) =>
  api.put(`/grievances/${id}/resolve`, data);

export const rejectGrievance = (id, data) =>
  api.put(`/grievances/${id}/reject`, data);

export const changeDepartment = (id, payload) =>
  api.patch(`/grievances/${id}/change-department`, payload);

export const getDepartments = () => api.get("/departments");

//Generate and download grievance Excel report

export const downloadGrievanceReport = async (id) => {
  const response = await api.get(`/grievances/${id}/report`, {
    responseType: "blob",
  });

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  link.setAttribute("download", `Grievance-${id}-Report.xlsx`);

  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(url);
};

 //Generate and download all/filter-matched grievances Excel report

export const downloadAllGrievancesReport = async (filters = {}) => {
  const params = {};

  if (filters.search?.trim()) {
    params.search = filters.search.trim();
  }

  if (filters.department) {
    params.department = filters.department;
  }

  if (filters.status) {
    params.status = filters.status;
  }

  if (filters.priority) {
    params.priority = filters.priority;
  }

  if (filters.sentiment) {
    params.sentiment = filters.sentiment;
  }

  const response = await api.get("/grievances/report", {
    params,
    responseType: "blob",
  });

  const blob = new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "Grievances-Report.xlsx");

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};
