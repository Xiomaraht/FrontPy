import api from "@/api/axios";

export const cambiarContrasena = async ({ actual, nueva }) => {
  try {
    const { data } = await api.patch("/ChangePassword", {
      contrasenaActual: actual,
      nuevaContrasena: nueva,
    });
    return data;
  } catch (error) {
    if (!error.response) {
      throw new Error("No se pudo conectar con el servidor");
    }
    throw error;
  }
};