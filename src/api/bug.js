import api from "./axios";

export const getBugList = async () => {
  const res = await api.get("/api/bug/getBugList");
  return res.data.bugs;
};
export const getBugById = async (id) => {
  const res = await api.get(`/api/bug/getBugById/${id}`);
  return res.data.bug;
};

export const getTesterProjects = async () => {
  const res = await api.get("/api/project/testerProjectList");
  return res.data;
};

export const addBug = async (payload) => {
  const res = await api.post("/api/bug/create", payload);
  return res.data.bug;
};

export const updateBug = async (id, payload) => {
  const res = await api.patch(`/api/bug/update/${id}`, payload);
  return res.data;
};
export const updateBugStatus = async (id, status) => {
  const res = await api.patch(`/api/bug/updateBugStatus/${id}`, { status });
  return res.data;
};
