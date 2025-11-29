const API_BASE_URL = 'http://localhost:8080/auth'; // Asegúrate que esta sea tu URL base de la API

/**
 * Realiza la petición de inicio de sesión a la API.
 * @param {string} login - El correo/login del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<{accessToken: string, refreshToken: string}>} - Los tokens recibidos.
 * @throws {Error} - Lanza un error si la autenticación falla (ej: 401).
 */
export const loginApi = async (login, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // El body debe coincidir con la estructura LoginRequest del backend
        body: JSON.stringify({
            login: login,
            password: password
        })
    });

    if (!response.ok) {
        // Lanza un error que será capturado en el catch del componente
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error de autenticación');
    }

    // Devuelve los tokens que vienen en el cuerpo de la respuesta
    const tokenResponse = await response.json();
    return tokenResponse; // Contiene { access_token: "...", refresh_token: "..." }
};

export const registerUserApi = async (userData) => {
    // 1. Definir la URL de registro
    const registerURL = `${API_BASE_URL}/register`;

    // 2. Realizar la petición POST
    const response = await fetch(registerURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // 3. El body es el objeto JSON que has construido en tu componente
        body: JSON.stringify(userData)
    });

    // 4. Manejo de errores de la API
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro de usuario');
    }

    // 5. Devolver la respuesta (que según dices, contiene los tokens)
    const dataResponse = await response.json();
    return dataResponse;
};