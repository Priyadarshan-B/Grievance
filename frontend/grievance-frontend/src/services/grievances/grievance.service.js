import api from "../../api/axios";

export const createGrievance = async (payload) => {
  const { data } = await api.post("/grievances", payload);

  return data;
};

export const getMyGrievances = async () => {
  const { data } = await api.get("/grievances/my");

  return data;
};

export const getGrievanceById = async (id) => {
  const { data } = await api.get(`/grievances/${id}`);

  return data;
};
