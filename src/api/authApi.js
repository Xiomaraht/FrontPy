import api from "@/api/axios"; // mi instancia

export const login = (username, password) => {
  return api.post("/api/auth/login", { username, password });
};

// Alias for compatibility during migration if needed, but we'll try to use one.
export const loginApi = async (username, password) => {
    try {
      const response = await api.post("/api/auth/login", { username, password });
      const token = response.data.token;
      if (!token) throw new Error("No se recibió token del backend");
      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      throw error;
    }
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