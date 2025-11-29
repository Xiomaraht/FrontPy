import { fetchWithAuth } from './fetchWithAuth'; 

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const logout = async () => {
    const token = getAccessToken(); 
    //cabezera de autorización
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    try {
        await fetchWithAuth('/auth/logout', { 
            method: 'POST',
            headers: headers 
        });
        
    } catch (error) {
        // En caso de que el token ya esté expirado o haya un error de red,
        // simplemente limpiamos el frontend para asegurar el cierre de sesión local.
        console.warn("Advertencia al intentar revocar el token en la API. Procediendo a limpiar sesión local.", error);
    }

    // 2. Limpiar el almacenamiento local (¡CRUCIAL!)
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    
};