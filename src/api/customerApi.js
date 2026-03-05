import api from "../api/axios";

// Crear cliente
export const registerCustomerApi = async (customerData) => {
  try {
    const { data } = await api.post("/customers", customerData);
    return data;
  } catch (error) {
    if (!error.response) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};

// Obtener cliente por userId
export const getCustomerApi = async (userId) => {
  try {
    const { data } = await api.get(`/customers/user/${userId}`);
    return data;
  } catch (error) {
    if (!error.response) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};