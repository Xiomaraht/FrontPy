import { fetchWithAuth } from './fetchWithAuth';

export const obtenerCategorias = async () => {
    try {
        const respuesta = await fetchWithAuth('/categories');
        if (!respuesta.ok) {
            throw new Error("Hubo un error al obtener las categorías");
        }
        return await respuesta.json();
    } catch (error) {
        if (
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError")
        ) {
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }
};