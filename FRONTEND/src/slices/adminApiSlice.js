import axios from "axios";

const ADMIN_URL = "/api/admin";

export const adminLogin = async (data) => {
  try {
    const response = await axios.post(`${ADMIN_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Invalid email or password");
  }
};

export const adminLogout = async () => {
  try {
    const response = await axios.post(`${ADMIN_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed");
  }
};

export const listUser = async () => {
  try {
    const response = await axios.get(`${ADMIN_URL}/listUser`);
    return response.data;
  } catch (error) {
    console.error("List User error:", error);
    throw new Error("List User failed");
  }
};

export const editUser = async (data) => {
  try {
    const response = await axios.post(`${ADMIN_URL}/editUser`, data);
    return response.data;
  } catch (error) {
    console.error("Edit user error", error);
    throw new Error("Edit user error");
  }
};

export const deleteUser = async (data) => {
  try {
    const response = await axios.post(`${ADMIN_URL}/deleteUser`, data);
    return response.data;
  } catch (error) {
    console.error("Delete user error", error);
    throw new Error("Delete user error");
  }
};
