import api from "../api/axios";

export const loginApi = async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    const token = response.data.token;

    if (!token) {
      throw new Error("No se recibió token del backend");
    }

    localStorage.setItem("token", token);

    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    throw error;
  }
};