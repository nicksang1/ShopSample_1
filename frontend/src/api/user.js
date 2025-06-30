// api/user.js
import axios from "./axios";

export const getUsers = async () => {
  const res = await axios.get("/users");
  return res.data.data;
};

export const createUser = async (user) => {
  const res = await axios.post("/users", user);
  return res.data.data;
};

export const updateUser = async (id, updatedUser) => {
  const res = await axios.put(`users/${id}`, updatedUser);
  return res.data.data;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`/users/${id}`);
  return res.data.data;
};
