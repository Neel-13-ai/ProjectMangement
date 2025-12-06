import api from "./axios";

export const getUsers = async () => {
  const res = await api.get("/api/admin/getUSer");
  return res.data.users;
};
export const getUserById = async (id) => {
  const res = await api.get(`/api/admin/getUSerById/${id}`);
  return res.data.user;
};

export const addUser = async (payload) => {
  const res = await api.post("/api/auth/register", payload);
  return res.data;
};

export const updateUser = async (id, payload) => {
  const res = await api.patch(`/api/admin/update/${id}`, payload);
  return res.data;
};
