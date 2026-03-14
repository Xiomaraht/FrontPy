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
