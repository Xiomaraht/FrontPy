import { fetchWithAuth } from './fetchWithAuth';

export const obtenerBarrios = async () => {
    try {
        const respuesta = await fetchWithAuth('/neighborhoods');
        if(!respuesta.ok){
            throw new Error("Hubo un error al obtener los productos")
        }
        return await respuesta.json();
    } catch (error) {
        if(
            error.mensaje.include("Failed to fetch") || 
            error.message.include("NetworkError"))
            {
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }
};
