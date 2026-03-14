import api from "@/api/axios";

// Crear cliente
export const registerCustomerApi = async (customerData) => {
  try {
    const { data } = await api.post("/api/customers", customerData);
    return data;
  } catch (error) {
    if (!error.response) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};

export const obtenerClientesPorClinica = async (clinicId) => {
  try {
    const { data } = await api.get(`/api/customers/clinic/${clinicId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// Obtener cliente por userId
export const getCustomerApi = async (userId) => {
  try {
    const { data } = await api.get(`/api/customers/user/${userId}`);
    return data;
  } catch (error) {
    if (!error.response) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};