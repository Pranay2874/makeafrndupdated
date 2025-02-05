import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/user";

axios.defaults.withCredentials = true; // ✅ Ensure cookies are sent with requests

export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Signup failed" };
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password }, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Login failed" };
  }
};
