import api from "../api/axios";

export const obtenerCategorias = async () => {
  try {
    const { data } = await api.get("/categories");
    return data;
  } catch (error) {
    if (!error.response) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};