// neighborhoodsApi.js
import api from "../api/axios";

export const obtenerBarrios = async () => {
  try {
    const response = await api.get("/neighborhoods");
    return response.data;
  } catch (error) {
    if (
      error.message?.includes("Network Error")
    ) {
      throw new Error("No se pudo conectar con el servidor");
    }

    throw (
      error.response?.data?.message ||
      "Error al obtener barrios"
    );
  }
};