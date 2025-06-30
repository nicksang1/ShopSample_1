// api/user.js
import axios from "./axios";

export const getUsers = async () => {
  const res = await axios.get("/users");
  return res.data.data;
};
