// servicesApi.js
import api from "@/api/axios";

const BASE_URL = "/api/services";

export const obtenerServicios = async () => {
  try {
    const response = await api.get(BASE_URL);
    return response.data;
  } catch {
    throw new Error("Error al obtener servicios");
  }
};

export const obtenerServicioPorId = async (id) => {
  try {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      `Error ${error.response?.status} al obtener servicio`
    );
  }
};

export const crearServicio = async (nuevoServicio) => {
  try {
    const response = await api.post(BASE_URL, nuevoServicio);
    return response.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al crear servicio"
    );
  }
};

export const actualizarServicio = async (id, servicioActualizado) => {
  try {
    const response = await api.put(
      `${BASE_URL}/${id}`,
      servicioActualizado
    );
    return response.data || { message: "Actualizado correctamente" };
  } catch (error) {
    throw (
      error.response?.data?.message ||
      "Error al actualizar servicio"
    );
  }
};

export const eliminarServicio = async (id) => {
  try {
    await api.delete(`${BASE_URL}/${id}`);
    return { message: "Servicio eliminado correctamente" };
  } catch (error) {
    throw (
      error.response?.data?.message ||
      `Error ${error.response?.status} al eliminar servicio`
    );
  }
};