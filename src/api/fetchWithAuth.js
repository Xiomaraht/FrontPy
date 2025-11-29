const API_BASE_URL = 'http://localhost:8080';

const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

// Rutas públicas según la configuración de Spring Security
const isPublicRoute = (endpoint, method = 'GET') => {
    // Normaliza el endpoint (quita query params)
    const cleanEndpoint = endpoint.split('?')[0];

    // Rutas públicas exactas
    const publicExact = [
        '/v3/api-docs',
        '/swagger-ui',
        '/swagger-ui.html',
        '/auth',
        '/neighborhoods',
    ];
    if (publicExact.some(route => cleanEndpoint.startsWith(route))) return true;

    // ====> MODIFICACIÓN AQUÍ <====
    // Productos, servicios, clínicas, categorías Y DATOS MAESTROS: solo GET
    if (
        method === 'GET' &&
        (
            cleanEndpoint.startsWith('/products') ||
            cleanEndpoint.startsWith('/services') ||
            cleanEndpoint.startsWith('/veterinary-clinics') ||
            cleanEndpoint.startsWith('/categories') ||
            cleanEndpoint.startsWith('/data/species') ||
            cleanEndpoint.startsWith('/data/races')
        )
    ) return true;

    // Crear cliente es público (POST /customers)
    if (method === 'POST' && cleanEndpoint.startsWith('/customers')) return true;

    return false;
};

export const fetchWithAuth = (endpoint, options = {}) => {
    const method = options.method ? options.method.toUpperCase() : 'GET';
    const token = getAccessToken();
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
        // Establecer Content-Type por defecto, pero permitir sobrescribirlo
        ...(method !== 'GET' && { 'Content-Type': 'application/json' }),
        ...options.headers,
    };

    if (!isPublicRoute(endpoint, method)) {
        // Ruta protegida: requiere token
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.error(`Acceso denegado: Token no disponible para ${endpoint}`);
            throw new Error('Acceso denegado: autenticación requerida');
        }
    }
    // Si es pública, no se agrega Authorization

    // Configuración final de la petición
    const finalOptions = {
        ...options,
        headers: headers,
    };

    return fetch(url, finalOptions);
};