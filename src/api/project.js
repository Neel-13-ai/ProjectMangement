import api from "./axios";

export const getProjects = async () => {
  const res = await api.get("/api/project/projectList");
  return res.data.projects;
};
export const getProjectById = async (id) => {
  const res = await api.get(`/api/project/getProjectById/${id}`);
  return res.data;
};

export const addProject = async (payload) => {
  const res = await api.post("/api/project/create", payload);
  return res.data;
};
export const updateProject = async (id, payload) => {
  const res = await api.patch(`/api/project/update/${id}`, payload);
  return res.data;
};
export const updateProjectStatus = async (id, status) => {
  const res = await api.patch(`/api/project/update/status/${id}`, {status});
  return res.data;
};

export const getDevelopers = async () => {
  const res = await api.get("/api/auth/getDevelopers");
  return res.data;
};
