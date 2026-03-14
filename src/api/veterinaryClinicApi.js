import api from "@/api/axios";

export const registerVeterinaryApi = async (data) => {
    try {
        const response = await api.post("/api/veterinary-clinics", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al registrar la veterinaria");
    }
};
