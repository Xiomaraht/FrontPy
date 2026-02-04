const API_BASE_URL = 'http://localhost:8080/auth'; // Asegúrate que esta sea tu URL base de la API

/**
 * Realiza la petición de inicio de sesión a la API.
 * @param {string} login - El correo/login del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<{accessToken: string, refreshToken: string}>} - Los tokens recibidos.
 * @throws {Error} - Lanza un error si la autenticación falla (ej: 401).
 */
export const loginApi = async (login, password) => {
  const loginURL = `${API_BASE_URL}/login`;

  const response = await fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al iniciar sesión");
  }

  const tokenResponse = await response.json();
  return tokenResponse;
};

/* =========================
   REGISTRO DE USUARIO
========================= */

export const registerUserApi = async (userData) => {
  const registerURL = `${API_BASE_URL}/register`;

  const response = await fetch(registerURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error en el registro de usuario"
    );
  }

  const dataResponse = await response.json();
  return dataResponse;
};