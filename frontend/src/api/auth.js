import axios from "./axios";

export const login = async (username, password) => {
  // console.log(username, password);
  const response = await axios.post("/auth", {
    username,
    password,
  });
  return response.data;
};
