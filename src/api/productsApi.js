// productsApi.js
import api from "@/api/axios";

export const obtenerProductos = async () => {
  try {
    const response = await api.get("/api/products");
    return response.data;
  } catch (error) {
    if ([401, 403].includes(error.response?.status)) {
      throw new Error("Acceso no autorizado o denegado");
    }
    throw new Error("Error al obtener productos");
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    const response = await api.get(`/api/products/${id}`);
    return response.data;
  } catch {
    throw new Error("Producto no encontrado");
  }
};

export const crearProducto = async (data) => {
  try {
    const response = await api.post("/api/products", data);
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("Permisos insuficientes");
    }
    throw new Error("Error al crear producto");
  }
};

export const actualizarProducto = async (id, data) => {
  try {
    const response = await api.put(`/api/products/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Error al actualizar producto");
  }
};

export const eliminarProducto = async (id) => {
  try {
    await api.delete(`/api/products/${id}`);
    return { success: true };
  } catch (error) {
    throw (
      error.response?.data?.message ||
      `Error al eliminar producto (${error.response?.status})`
    );
  }
};

