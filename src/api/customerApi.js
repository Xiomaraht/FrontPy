import { fetchWithAuth } from './fetchWithAuth';

export const registerCustomerApi = async (customerData) => {
    try {
        const respuesta = await fetchWithAuth('/customers',{
            method: 'POST',
            body: JSON.stringify(customerData)
        });
        if (!respuesta.ok) {
            throw new Error("Hubo un error al obtener las categorías");
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
};

export const getCustomerApi = async (userId) => { 
    try{
        const respuesta = await fetchWithAuth(`/customers/user/${userId}`);
        if(!respuesta.ok){
            throw new Error("Hubo un error al obtener el cliente");
        }
        return await respuesta.json();
    }catch(error){
        if(
            error.message.includes("Failed to fetch") ||
            error.message.includes("NetworkError")
        ){
            throw new Error("No se pudo conectar con el servidor");
        }
        throw error;
    }
}  