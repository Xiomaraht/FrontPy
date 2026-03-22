import api from "@/api/axios";

export const createAppointmentApi = async (data) => {
  try {
    const response = await api.post("/api/appointments", data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al agendar la cita");
  }
};

export const obtenerCitasPorCliente = async (customerId) => {
  try {
    const response = await api.get(`/api/appointments/customer/${customerId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener las citas del cliente");
  }
};

export const obtenerCitasPorClinica = async (clinicId) => {
  try {
    const response = await api.get(`/api/appointments/clinic/${clinicId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener las citas de la clínica");
  }
};

export const actualizarEstadoCita = async (id, status) => {
  try {
    const response = await api.patch(`/api/appointments/${id}/status?status=${status}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar el estado de la cita");
  }
};

export const obtenerCitasPorMascota = async (petId) => {
  try {
    const response = await api.get(`/api/appointments/pet/${petId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener las citas de la mascota");
  }
};
