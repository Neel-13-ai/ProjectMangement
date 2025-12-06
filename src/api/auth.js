import api from "./axios";

export const loginUser = async (data) => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const getAdminDashboard = async () => {
  const res = await api.get("/api/dashboard/admin");
  return res.data;
};
