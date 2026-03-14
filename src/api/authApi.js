import api from "@/api/axios"; // mi instancia

export const login = (data) => {
  return api.post("/api/auth/login", data);
};

export const registerUserApi = (data) => {
  return api.post("/api/users/create", data);
};

export const logout = async () => {
  try {
    await api.post("/api/auth/logout");
  } catch (error) {
    console.warn("Error cerrando sesión", error);
  }

  // Limpieza local
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
};

export const recuperarPasswordApi = async (email) => {
  const response = await api.post("/api/auth/forgot-password", { email });
  return response.data;
};

export const resetPasswordApi = async (token, newPassword) => {
  const response = await api.post("/api/auth/reset-password", { token, newPassword });
  return response.data;
};