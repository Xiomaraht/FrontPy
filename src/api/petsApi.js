// petsApi.js
import api from "@/api/axios";

export const registerPet = async (petData) => {
  try {
    const response = await api.post("/api/pets", petData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al registrar la mascota";
  }
};

export const getPetsByCustomerIdApi = async (customerId) => {
  try {
    const response = await api.get(`/api/pets/customer/${customerId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw error.response?.data?.message || "Error al obtener mascotas";
  }
};

export const registerPetForCustomer = async (customerId, petData) => {
  try {
    const response = await api.post(
      `/api/pets/customer/${customerId}`,
      petData
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("Acceso denegado. Verifique su rol.");
    }
    throw new Error(error.response?.data?.message || "Error al registrar mascota");
  }
};

export const obtenerMascotasPorClinica = async (clinicId) => {
  try {
    const response = await api.get(`/api/pets/clinic/${clinicId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Error al obtener mascotas por clínica";
  }
};

export const updatePetApi = async (id, petData) => {
  try {
    const response = await api.put(`/api/pets/${id}`, petData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al actualizar la mascota");
  }
};