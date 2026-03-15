import api from "@/api/axios";

// Ver todos los planes disponibles
export const obtenerPlanes = async () => {
    try {
        const response = await api.get("/api/subscriptions/plans");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener los planes");
    }
};

// Obtener la suscripción actual de una clínica
export const obtenerSuscripcionClinica = async (clinicId) => {
    try {
        const response = await api.get(`/api/subscriptions/clinic/${clinicId}`);
        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            return null; // No tiene suscripción activa
        }
        throw new Error(error.response?.data?.message || "Error al obtener la suscripción");
    }
};

// Crear una nueva suscripción para una clínica
export const suscribirClinica = async (clinicId, planId) => {
    try {
        const response = await api.post(`/api/subscriptions/subscribe/${clinicId}/${planId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al procesar la suscripción");
    }
};

// --- ADMINISTRADOR GENERAL ---

// Obtener todas las suscripciones de todas las clínicas
export const obtenerTodasLasSuscripcionesGen = async () => {
    try {
        const response = await api.get("/api/subscriptions/all");
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al obtener todas las suscripciones");
    }
};

// Actualizar estado de una suscripción
export const actualizarEstadoSuscripcionGen = async (id, status) => {
    try {
        const response = await api.patch(`/api/subscriptions/${id}/status?status=${status}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al actualizar estado");
    }
};

// Cancelar una suscripción
export const cancelarSuscripcionGen = async (id) => {
    try {
        const response = await api.post(`/api/subscriptions/${id}/cancel`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cancelar la suscripción");
    }
};
