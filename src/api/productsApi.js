import { fetchWithAuth } from './fetchWithAuth'; //Envia la verificacion de Autorizacion a todo lado

export const obtenerProductos = async () => {
    try {
        const respuesta = await fetchWithAuth('/products');
        if(!respuesta.ok){
            const errorStatus = respuesta.status;
            if(errorStatus === 401 || errorStatus === 403){
                throw new Error("Acceso no autorizado o denegado. Codigo: " + errorStatus);
            }
            throw new Error("Hubo un error al obtener los productos")
        }
        return await respuesta.json();
    } catch (error) {
        if (error.message && (error.message.includes("Failed to fetch") || error.message.includes("NetworkError"))) {
                    throw new Error("No se pudo conectar con el servidor");
        }
    }    
};

export const obtenerProductoPorId = async (id) => {
    // Es un GET y la ruta es pública para cualquiera
    const res = await fetchWithAuth(`/products/${id}`, {
        method: "GET",
    });
    if (!res.ok) throw new Error("Producto no encontrado");
    return res.json();
};

export const crearProducto = async (data) => {
    // La creación (POST) requiere autenticación
    const res = await fetchWithAuth('/products', {
        method: "POST",
        // El header "Content-Type" se inyecta automáticamente en fetchWithAuth
        body: JSON.stringify(data),
    });
    
    // Mejor manejo de errores:
    if (res.status === 403) throw new Error("Permisos insuficientes para crear el producto.");
    if (!res.ok) throw new Error("Error al crear producto");
    return res.json();
};

export const eliminarProducto = async (id) => {
    // La eliminación (DELETE) requiere autenticación
    const res = await fetchWithAuth(`/products/${id}`, {
        method: "DELETE",
    });
    
    if (!res.ok) {
        // Intenta obtener un mensaje de error del cuerpo de la respuesta, si existe.
        const errorData = await res.json().catch(() => null); 
        const errorMessage = errorData?.message || `Error al eliminar el producto. Código: ${res.status}`;
        throw new Error(errorMessage);
    }
    return { success: true }; 
};

export const actualizarProducto = async (id, data) => {
    // La actualización (PUT) requiere autenticación
    const res = await fetchWithAuth(`/products/${id}`, {
        method: "PUT",
        // El header "Content-Type" se inyecta automáticamente
        body: JSON.stringify(data),
    });
    
    if (!res.ok) throw new Error("Error al actualizar producto");
    return res.json();
};


