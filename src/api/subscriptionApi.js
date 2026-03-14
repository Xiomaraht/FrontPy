import axios from './axios';

export const obtenerPlanes = async () => {
    try {
        const response = await axios.get('/subscriptions/plans');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const crearPlan = async (planData) => {
    try {
        const response = await axios.post('/subscriptions/plans', planData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const obtenerSuscripcionClinica = async (clinicId) => {
    try {
        const response = await axios.get(`/subscriptions/clinic/${clinicId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const suscribirClinica = async (clinicId, planId) => {
    try {
        const response = await axios.post(`/subscriptions/subscribe/${clinicId}/${planId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const obtenerTodasSuscripciones = async () => {
    try {
        const response = await axios.get('/subscriptions/all');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const actualizarEstadoSuscripcion = async (id, status) => {
    try {
        const response = await axios.patch(`/subscriptions/${id}/status?status=${status}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const cancelarSuscripcion = async (id) => {
    try {
        const response = await axios.post(`/subscriptions/${id}/cancel`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
