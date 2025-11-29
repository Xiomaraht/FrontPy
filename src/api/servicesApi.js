
import { fetchWithAuth } from './fetchWithAuth';

const BASE_URL = '/services';

// --- CRUD: OBTENER TODOS LOS SERVICIOS (Lista) ---
export const obtenerServicios = async () => {
    try {
        const res = await fetchWithAuth(BASE_URL, { method: "GET" });
        if (!res.ok) {
            throw new Error(`Error ${res.status} al obtener la lista de servicios. (URL: ${BASE_URL})`);
        }
        return res.json();
    } catch (error) {
        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            throw new Error("ERROR DE CONEXIÓN: No se pudo conectar con el servidor. Verifique que el backend esté activo.");
        }
        throw error;
    }
};

// --- CRUD: OBTENER SERVICIO POR ID (Detalle) ---
export const obtenerServicioPorId = async (id) => {
    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
        throw new Error(`ID de servicio no válido. Se esperaba un número entero positivo, pero se recibió: ${id}`);
    }
    try {
        const res = await fetchWithAuth(`${BASE_URL}/${id}`, { method: "GET" });
        if (!res.ok) {
            const errorBody = await res.text().catch(() => 'No hay detalles de error.');
            throw new Error(`Error ${res.status} al obtener el servicio: ${errorBody}`);
        }
        return res.json();
    } catch (error) {
        throw error;
    }
};

// --- CRUD: CREAR NUEVO SERVICIO ---
export const crearServicio = async (nuevoServicio) => {
    try {
        const res = await fetchWithAuth(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(nuevoServicio),
        });
        if (!res.ok) {
            const errorBody = await res.json().catch(() => ({ message: 'Error al crear el servicio.' }));
            throw new Error(`Error ${res.status}: ${errorBody.message || 'Error desconocido'}`);
        }
        return res.json();
    } catch (error) {
        throw error;
    }
};

// --- CRUD: ACTUALIZAR SERVICIO EXISTENTE ---
export const actualizarServicio = async (id, servicioActualizado) => {
    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
        throw new Error("ID de servicio no válido para la actualización.");
    }
    try {
        const res = await fetchWithAuth(`${BASE_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(servicioActualizado),
        });
        if (!res.ok) {
            const errorBody = await res.json().catch(() => ({ message: 'Error al actualizar el servicio.' }));
            throw new Error(`Error ${res.status}: ${errorBody.message || 'Error desconocido'}`);
        }
        return res.status === 204 ? { message: 'Servicio actualizado con éxito.' } : res.json();
    } catch (error) {
        throw error;
    }
};

// --- CRUD: ELIMINAR SERVICIO ---
export const eliminarServicio = async (id) => {
    if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
        throw new Error("ID de servicio no válido para la eliminación.");
    }
    try {
        const res = await fetchWithAuth(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (res.status === 404) {
            throw new Error(`El servicio con ID ${id} no existe.`);
        }
        if (!res.ok) {
            throw new Error(`Error ${res.status} al eliminar el servicio.`);
        }
        return { message: `Servicio con ID ${id} eliminado con éxito.` };
    } catch (error) {
        throw error;
    }
};