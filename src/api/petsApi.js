import { fetchWithAuth } from './fetchWithAuth';

export const registerPet = async (petData) => {
    try {
        const respuesta = await fetchWithAuth('/pets',{
            method: 'POST',
            body: JSON.stringify(petData)
        });
        if (!respuesta.ok) {
            throw new Error("Hubo un error al obtener la mascota");
        }
        return await respuesta.json();
    } catch(error){
        if(
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError")
        ){
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }  
}

export const getPetsByCustomerIdApi = async (customerId) => {
    try {
        const respuesta = await fetchWithAuth(`/pets/customer/${customerId}`);
        if (!respuesta.ok) {
            // Asume que 404/204 significaría que no hay mascotas o el cliente no existe.
            if (respuesta.status === 404) {
                 return []; // Retorna un array vacío si no se encuentra el cliente (si el servicio lanza ResourceNotFoundException y el Controller lo maneja con 404)
            }
            throw new Error("Hubo un error al obtener las mascotas del cliente");
        }
        return await respuesta.json(); // Retorna List<PetDTO>
    } catch(error){
        if(
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError")
        ){
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }
};

export const registerPetForCustomer = async (customerId, petData) => {
    try {
        // Usamos el customerId en la URL para asociar la mascota al cliente
        const respuesta = await fetchWithAuth(`/pets/customer/${customerId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(petData) 
        });
        
        if (!respuesta.ok) {
            let errorMessage = `Error al registrar la mascota. Código: ${respuesta.status}`;
            
            // Intenta leer el JSON solo si la respuesta tiene contenido
            const contentType = respuesta.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                try {
                    const errorBody = await respuesta.json();
                    errorMessage = errorBody.message || errorBody.error || errorMessage;
                } catch (e) {
                    // Si no se pudo parsear el JSON, usa el mensaje por defecto
                    errorMessage = `Error ${respuesta.status}: No se pudo leer el mensaje del servidor.`;
                }
            } else if (respuesta.status === 403) {
                errorMessage = 'Acceso denegado. Verifique su rol o permisos.';
            }

            throw new Error(errorMessage);
        }
        
        return await respuesta.json(); // Devuelve el PetDTO creado
    } catch(error){
        if(
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError")
        ){
            throw new Error("No se pudo conectar con el servidor.");
        }
        throw error;
    }  
}