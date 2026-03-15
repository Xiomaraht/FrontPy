import api from "@/api/axios";

export const registerVeterinaryApi = async (data) => {
    try {
        const response = await api.post("/api/veterinary-clinics", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al registrar la veterinaria");
    }
};

export const obtenerFacturasPorClinica = async (clinicId) => {
    try {
        const response = await api.get(`/api/bills/clinic/${clinicId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener las facturas");
    }
};

export const obtenerClinicaPorId = async (id) => {
    try {
        const response = await api.get(`/api/veterinary-clinics/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener la veterinaria");
    }
};

export const actualizarClinica = async (id, data) => {
    try {
        const response = await api.put(`/api/veterinary-clinics/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al actualizar la veterinaria");
    }
};

export const obtenerClinicasVeterinarias = async () => {
    try {
        const response = await api.get("/api/veterinary-clinics");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener las veterinarias");
    }
};
