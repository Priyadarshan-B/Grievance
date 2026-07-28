import api from "../../api/axios";

export const getUserDashboard = async () => {
  const { data } = await api.get("/dashboard/user");
  return data.data;
};

export const getAdminDashboard = async () => {
  const { data } = await api.get("/dashboard/admin");
  return data.data;
};