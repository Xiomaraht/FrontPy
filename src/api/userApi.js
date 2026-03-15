import api from "@/api/axios";

export const updateUserApi = async (userData) => {
    try {
        const { data } = await api.put("/api/users/update", userData);
        return data;
    } catch (error) {
        if (!error.response) {
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }
};

export const getUserByIdApi = async (id) => {
    try {
        const { data } = await api.get(`/api/users/${id}`);
        return data;
    } catch (error) {
        if (!error.response) {
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }
};

export const obtenerUsuarios = async () => {
    try {
        const { data } = await api.get("/api/users");
        return data;
    } catch (error) {
        if (!error.response) {
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }
};
